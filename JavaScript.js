addChefWindow = 0;//判断添加厨师窗口是否打开,初始为0未打开

function addChef() {    //增加厨师
    coverPage();    //使背景变暗

    if (addChefWindow == 1) return;
    let main = document.getElementById("main");
    let newDiv = document.createElement("div");

    let words = ["招聘新厨师", "招聘一名新厨师可以帮你更快地为顾客烹饪菜肴,", "增加餐厅收入。你最多可以拥有六名厨师。",
        "但每个厨师每周需要你支付工资￥100", "请问你确认新招聘一名厨师吗?"]

    let text = [];
    for (let i = 0; i < 5; i++) {
        if (i == 0)
            text[i] = document.createElement("h2");
        else
            text[i] = document.createElement("h3");
        text[i].innerText = words[i];
        newDiv.appendChild(text[i]);
    } //创建并添加五行文字部分


    let yes = document.createElement("h4");
    let no = document.createElement("h4");

    yes.setAttribute("class", "yes");
    yes.setAttribute("onclick", "cancel()");
    no.setAttribute("class", "no");
    no.setAttribute("onclick", "cancel()");
    yes.innerText = "是的，确认招聘";
    no.innerText = "先不了"; //创建确认和取消按钮

    newDiv.appendChild(yes);
    newDiv.appendChild(no); //将确认和取消按钮添加到newDiv中

    newDiv.setAttribute("id", "addChef");
    main.appendChild(newDiv);
    addChefWindow = 1;
}

function cancel() {     //将弹窗去除
    let delDiv = document.getElementById("addChef");
    delDiv.remove();
    cancelCoverPage();
    addChefWindow = 0;
}

function music(){   //控制音乐播放暂停
    let backgroundMusic = document.getElementById("music");
    if(!backgroundMusic.paused)
        backgroundMusic.pause();
    else
        backgroundMusic.play();
}

function coverPage(){   //显示遮罩层 使背景变暗
    let cover = document.getElementById("cover");
    cover.style.display = "block";  //显示遮罩层
}

function cancelCoverPage(){   //取消遮罩层 使背景恢复
    let cover = document.getElementById("cover");
    cover.style.display = "none";  //取消遮罩层
}