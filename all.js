//所有頁面
const loginPage = document.querySelector(".login")
const signupPage = document.querySelector(".signup");
const todoPage = document.querySelector(".todo");

//登入頁面
const loginSignupBtn = document.getElementById("login_signupbtn");
const loginEmail = document.getElementById("login_email");
const loginPassword = document.getElementById("login_password");
const loginLoginbtn = document.getElementById("login_loginbtn");
const loginSignupbtn = document.getElementById("login_signupbtn");
const errorTxtListLogin = document.querySelectorAll(".error_txt_login");


//API
const apiUrl = `https://todoo.5xcamp.us`;
let nickname ="";

//送去API的資訊
signupInfo={};
loginInfo={};

//頁面控制
function switchPage(pageName){
    //初始化頁面，頁面全部設為不顯示(以下1~6行)
    loginPage.classList.remove("none");
    signupPage.classList.remove("none");
    todoPage.classList.remove("none");
   
    loginPage.classList.add("none");
    signupPage.classList.add("none");
    todoPage.classList.add("none");
    
    pageName.classList.remove("none");//要顯示的頁面移除none
    console.log("頁面跳轉結束");
}
//登入頁面function開始
loginLoginbtn.addEventListener("click",function(e){
    LoginInfoCheck();
})

loginEmail.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        LoginInfoCheck();
    }
  })

loginPassword.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        LoginInfoCheck();
    }
})

function LoginInfoCheck(){
    let error = 0;
    loginCheck(error);
    if(error == 0){
        loginInfo.email = loginEmail.value;
        loginInfo.password = loginPassword.value;
        login();
    }else{
        console.log("請確認登入資料是否有誤");
    }
}

function loginCheck(error){
    errorTxtListLogin.forEach((item)=>item.textContent="");
    if(!loginEmail.value){
        errorTxtListLogin[0].textContent = "email欄位不得為空";
        error += 1;
    }
    if(!loginPassword.value){
        errorTxtListLogin[1].textContent = "密碼欄不得為空";
        error += 1;
    }
    console.log(error);
    return error;
    
}

function login(){
    axios.post(`${apiUrl}/users/sign_in`,{
        "user": {
          "email": loginInfo.email,
          "password": loginInfo.password
        }
      })
      .then(res => {
        console.log(res.data);
        nickname = res.data.nickname;
        const token = res.headers.authorization;
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('token', token);
        getTodo();
    })
      .then(res => {
        clearInput(loginEmail);
        clearInput(loginPassword);
        })
      .then(res=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "登入成功",
                showConfirmButton: false,
                timer: 1000
            });
       })
      .then(res=>{
            switchPage(todoPage);
            renderUserName();
       })
      .catch(error => {
        console.log(error.response.data.message);
        //alert(error.response.data.message);
        if(error.response.data.message == "登入失敗"){
            Swal.fire({
                icon: "error",
                title: "帳號或密碼錯誤",
                text: "請重新確認帳號密碼",
                //footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    })
}

loginSignupBtn.addEventListener("click",function(e){
    //console.log(e.target.value);
    switchPage(signupPage);
})
//登入頁面結束--------------------------------------------------------------
//註冊頁面變數宣告
const signupEmail = document.getElementById("signup_email");
const signupNickName = document.getElementById("nickname");
const signupPassword = document.getElementById("signup_password");
const assurePassword = document.getElementById("signup_password-a");
const signupSignpBtn = document.getElementById("signup_signupbtn");
const signupLoginBtn = document.getElementById("signup_loginbtn");
const error_txtList = document.querySelectorAll(".error_txt");
//註冊頁面function開始
signupSignpBtn.addEventListener("click",function(e){      
    SignupInfoCheck();
})

signupEmail.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        SignupInfoCheck();
    }
})
signupNickName.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        SignupInfoCheck();
    }
})
signupPassword.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        SignupInfoCheck();
    }
})
assurePassword.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        SignupInfoCheck();
    }
})


function SignupInfoCheck(){
    let error = 0;
    signupCheck(error);
    if(error == 0){
        signupInfo.password = signupPassword.value;
        signupInfo.email = signupEmail.value;
        signupInfo.nickname = signupNickName.value;  
        console.log(signupInfo);
        signUp();
    }else{
        console.log("請重新確認填寫資料是否有誤:");
        } 
    console.log(error);
}



function signupCheck(error){
    error_txtList.forEach((item)=>item.textContent="");
    if(!signupEmail.value){
        error_txtList[0].textContent = "email欄位不得為空";
        console.log("email欄位不得為空");
        error += 1;
    }
    if(!signupNickName.value){
        error_txtList[1].textContent = "暱稱欄位不得為空";
        console.log("暱稱欄位不得為空");
        error += 1;
    }
    if(signupPassword.value  == ""|| assurePassword.value == ""){
        error_txtList[2].textContent ="密碼欄位不得為空";
        console.log("密碼欄位不得為空");
        error += 1;
    }
    if(signupPassword.value.length < 6){
        error_txtList[2].textContent ="密碼長度不得小於6位";
        console.log("密碼長度不得小於6位");
        error += 1;
    }
    if((signupPassword.value !== assurePassword.value)&&signupPassword.value){
        error_txtList[3].textContent = "兩次密碼不一致";
        console.log("兩次密碼不一致");
        error += 1;
    }

    return error;
}

function clearInput(inputName){
    inputName.value="";
}

function signUp(){
    axios.post(`${apiUrl}/users`,{
        "user": {
            "email": signupInfo.email,
            "nickname": signupInfo.nickname,
            "password": signupInfo.password
        }
      }
    )
      .then(res => {
        const token = res.headers.authorization;
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('token', token);
        nickname = res.data.nickname;
        console.log(res);
        getTodo();
        //alert("註冊成功");
        })
      .then(res =>{
        clearInput(signupEmail);
        clearInput(signupNickName);
        clearInput(signupPassword);
        clearInput(assurePassword);
      })
      .then(res=>{
        Swal.fire({
            title: "註冊成功!",
            text: "歡迎使用線上待辦清單",
            imageUrl: "img/img_2.png",

            imageAlt: "Custom image"
          });
      })
      .then(res=>{
        switchPage(todoPage);
        renderUserName(); //**********************************還沒測試
    })
      .catch(error => {
        console.log(error.response.data.error[0])
        //alert(error.response.data.error[0])
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error[0],
            footer: "請再試一次"
          });
      }) 
}

signupLoginBtn.addEventListener("click",function(e){
    switchPage(loginPage);
    //console.log(e.target.value);
})
//註冊頁面結束
//---------------------------------------------------------------------
//todoList頁面
// todoList頁面變數宣告
const todoInput = document.querySelector('.txt');
const addTodoBtn = document.querySelector('.btn_add');
const list = document.querySelector('.list');
const clear = document.querySelector('.clear');
const count = document.querySelector('.count');
const userName = document.querySelector('.name');
const tabAll = document.querySelector('.tab');
const tabs = document.querySelectorAll(".tab-link");
const cardList = document.querySelector(".card_list");
const noTodo = document.querySelector(".no_todo");
const logoutBtn = document.querySelector(".logout");

let data = [];

function renderUserName(){
    userName.textContent = `${nickname}的待辦`;
}

function renderData(data) {    
    let str = "";
    data.forEach((item, index)=>{
        str +=
            `<li>
                <label class="checkbox" for="">
                    <input type="checkbox" class="myCheckbox" data-id="${item.id}" ${item.completed_at == null ? "" : "checked"}>
                        <span>${item.content}</span>
                </label>
                <a href="#" data-id="${item.id}" class="delete">
                </a>
            </li>`;
    });
    
    list.innerHTML = str;
    countNum();
}

//getTodo的列表顯示在清單上的函數
function getTodo(){
    axios.get(`${apiUrl}/todos`)
    .then(res => {
        data = res.data.todos;
        renderData(data);//呼叫將getTodo的列表顯示在清單上的函數        
    })
    .then(res=>listView())
    .catch(error => console.log(error.response))
}

//tab區域有點擊事件會觸發tab切換功能
tabAll.addEventListener("click",function(e){    
    let tabName = e.target.getAttribute("data-tab");
    tabs.forEach((item)=>{
            item.classList.remove("active");
        })  
    if(e.target.getAttribute("data-tab") == tabName){
        e.target.classList.add("active");
      }
    //getTodo();
    console.log(data);
    currentTab = e.target.getAttribute("data-tab")
    let dataToRender="";
    if(currentTab == "tab-1"){
        dataToRender = data;
    }else if(currentTab == "tab-2"){
        dataToRender = data.filter(function(item){
            return item.completed_at == null;
        })
       
    }else if(currentTab == "tab-3"){
        dataToRender = data.filter(function(item){
            return item.completed_at !== null;
        })
    }
    console.log(dataToRender);
    renderData(dataToRender);
})
function addTodo(todo){  
    axios.post(`${apiUrl}/todos`,// 第一個參數
        {
            "todo": { // 第二個參數放要新增的項目
              "content": todo 
            }
          },
    )
    .then(res => {
        getTodo();
    })
    .catch(error => console.log(error.response))
}
//新增新的待辦事項到列表
addTodoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value="";

});
todoInput.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    addTodo(todoInput.value);
    todoInput.value="";
  }
})

//刪除待辦事項
list.addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.getAttribute("class") == "delete"){
        let deleteId = e.target.getAttribute("data-id")
        deleteTodo(deleteId);
    }
})
//清除全部待辦
clear.addEventListener("click",function(e){    
    e.preventDefault();
    let dataToDelete = data.filter(item=>{
        return item.completed_at !== null;
    })
    dataToDelete.forEach(item=>deleteTodo(item.id));
})
//刪除功能API
function deleteTodo(todoId){
    axios.delete(`${apiUrl}/todos/${todoId}`)
    .then(res => {
        getTodo();
    })
    .catch(error => console.log(error.response))
}

//toggle功能
function toggleTodo(todoId){
    axios.patch(`${apiUrl}/todos/${todoId}/toggle`,{})
    .then(res => {
        console.log(res);
        getTodo();
 
    })
    .catch(error => console.log(error.response))
}
list.addEventListener("click",function(e){
    if(e.target.getAttribute("class") == "myCheckbox"){
        let checkboxId = e.target.getAttribute("data-id");
        toggleTodo(checkboxId);        
    }
    
})
//計算待辦事項個數顯示在左下角
function countNum(){    
    let dataUncompleted = data.filter(function(item){
        return item.completed_at == null;
    });
    let dataLength = dataUncompleted.length;
    count.textContent = `${dataLength}個待完成項目`;
}

//計算待辦事項數量，若為零則不顯示清單
function listView(){
    cardList.classList.remove("none");
    noTodo.classList.remove("none");
    if(data.length == 0){
        cardList.classList.add("none");
    }else{
        noTodo.classList.add("none");
    }
}

//登出
function logout(){
    axios.delete(`${apiUrl}/users/sign_out`)
    .then(res=>{
        console.log(res);
        switchPage(loginPage);
    })
    .catch(error=>console.log(error.response))
}

logoutBtn.addEventListener("click",function(e){
    Swal.fire({
        title: "真的要登出嗎",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "是",
        denyButtonText: `取消`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          logout();
          Swal.fire("已登出", "", "success");
        }
      });
    
})