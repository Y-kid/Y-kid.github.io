    let week = 0,
        day = 0,
        money = 500, //设置初始日期 和 金钱
        isStart = 0, //判断游戏是否开始，用来判断时间是否增加
        isPlaced = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //用来判断座位是否有人
    customers = [], //用于存储十个位置的用户
        placeNum = 6;

    let names = ["亚瑟", "鬼谷子", "铠", "橘右京bai", "项羽", "梦奇", "白起", "赵云", "李白", "韩信", "刘备",
        "鲁班zhi七号", "墨子", "孙膑", "周瑜", "dao庄周", "廉颇", "程咬金", "典韦", "后羿", "扁鹊", "李元芳",
        "张飞", "刘禅", "兰陵王", "达摩", "曹操", "钟馗", "高渐离", "宫本武藏", "吕布", "嬴政", "姜子牙", "老夫子",
        "狄仁杰", "夏侯惇", "关羽", "哪吒", "太乙真人", "干将莫邪", "成吉思汗", "牛魔", "百里守约", "百里玄策",
        "苏烈", "黄忠", "诸葛亮", "东皇太一", "杨戬", "后羿", "孙悟空", "张良", "韩信", "刘邦", "达摩", "马可波罗",
        "娜可露露", "露娜", "妲己", "甄姬", "虞姬", "大乔", "小乔", "王昭君", "貂蝉", "芈月", "阿珂", "花木兰",
        "武则天", "不知火舞", "孙尚香", "蔡文姬", "安琪拉", "钟无艳", "女蜗", "雅典娜", "艾琳"
    ];

    class meal {

        constructor(name, value, progressValue) {
            this.name = name;
            this.value = value;
            this.progressValue = progressValue;
        }

    }

    class customer {

        constructor(name, avatarId, placeId) { //名字和头像序号
            this.name = name;
            this.avatarId = avatarId;
            this.placeId = placeId;
        }

        makeMeal(meal1, meal2, meal3) { //做顾客的菜  显示菜的名字和进度条
            makeMeal(meal1);
            makeMeal(meal2);
            makeMeal(meal3);
        }


        takePlace() { //顾客入座 在最前面位置的空座位坐下
            let place = "place" + this.placeId;
            let color, onclick, undercase = "";
            if (this.placeId <= 4)
                color = "color_orange", onclick = "orderMeal(" + this.placeId + ")";
            else
                color = "color_blue", onclick = "getPlace(" + this.placeId + ")",
                undercase = "<div class='under_case color_blue>等位中</div>";

            let img = document.createElement("img");
            img.setAttribute("class", "avatar customer " + color);
            img.setAttribute("src", "images/ifetaskasset/" + this.avatarId + ".png");
            img.setAttribute("onclick", onclick);
            let theplace = document.getElementById(place);
            theplace.innerHTML = undercase;
            theplace.appendChild(img);
        }


    }

    function leavePlace(placeId) { //顾客离开座位
        let place = "place" + placeId;
        document.getElementById(place).innerHTML = "<div class='avatar customer color_gray'></div>";
        customers[placeId - 1] = undefined;
        isPlaced[placeId - 1] = undefined;
    }

    function getPlace(placeId) { //等候区顾客重新寻找座位
        let newPlaceId = undefined;
        for (let i = 0; i < 4; i++)
            if (!isPlaced[i]) {
                isPlaced[i] = 1;
                newPlaceId = i + 1;
                break;
            }
        if (!newPlaceId) return;
        customers[newPlaceId - 1] = new customer(customers[placeId - 1].name, customers[placeId - 1].avatarId, newPlaceId);
        leavePlace(placeId);

        customers[placeId - 1] = undefined;
        let img = document.createElement("img");
        img.setAttribute("class", "avatar customer color_orange");
        img.setAttribute("src", "images/ifetaskasset/" + customers[newPlaceId - 1].avatarId + ".png");
        img.setAttribute("onclick", "leavePlace(" + customers[newPlaceId - 1].placeId + ")");
        newPlaceId = "place" + newPlaceId;
        let theplace = document.getElementById(newPlaceId);
        theplace.innerText = "";
        theplace.appendChild(img);

    }


    setTimeout(function () { //日期变化和顾客到来
        windowPop("startWindow"); //弹出开始窗口
        var timer = setInterval(function () { // 定时器进行日期的动态变化
            if (isStart) {
                if (day < 7)
                    ++day;
                else
                    day = 1, ++week;
                document.getElementById("week").innerText = 'W' + week;
                document.getElementById("day").innerText = 'D' + day;
            }
        }, 1000);

        var customersCome = setInterval(function () { //生成顾客函数 每5~20秒来一个顾客
            if (isStart && !isPlaced[placeNum - 1]) {
                let placeId = undefined;
                let avatarId = parseInt(Math.random() * 7, 10);
                let nameId = parseInt(Math.random() * names.length, 10);
                for (let i = 0; i < placeNum; i++)
                    if (!isPlaced[i]) {
                        isPlaced[i] = 1;
                        placeId = i;
                        break;
                    }
                if (placeId !== undefined) {
                    customers[placeId] = new customer(names[nameId], avatarId + 1, placeId + 1);
                    customers[placeId].takePlace();
                }
            }
        }, 1000);

    }, 0);

    function startGame() { //开始游戏
        windowCancel('startWindow'); //去除开始弹窗
        isStart = 1; //设置为游戏开始
    }

    function windowPop(id) { //弹出id窗口
        coverPop(); //显示遮罩层
        document.getElementById(id).style.display = "block";
    }

    function windowCancel(id) { //将id弹窗去除
        coverCancel(); //去除遮罩层
        document.getElementById(id).style.display = "none";
    }

    function music() { //控制音乐播放暂停
        let backgroundMusic = document.getElementById("music");
        if (!backgroundMusic.paused)
            backgroundMusic.pause();
        else
            backgroundMusic.play();
    }

    function coverPop() { //显示遮罩层
        document.getElementById("cover").style.display = "block";
    }

    function coverCancel() { //去除遮罩层
        document.getElementById("cover").style.display = "none";
    }

    function makeMeal(meal) { //顾客点的菜的进度条
        if (!meal) return;
        let progress = document.createElement("progress");
        let h3 = document.createElement("h3"); //创建h3和progress标签
        h3.setAttribute("class", "mealName meal_box1");
        h3.innerText = meal1.name; //设置h3标签属性
        progress.setAttribute("value", meal1.progressValue);
        progress.setAttribute("max", 10);
        progress.setAttribute("class", "progress mealProgress mealBox1"); //设置progress标枪属性
        let place = document.getElementById(this.place);
        place.appendChild(h3);
        place.appendChild(progress); //将h3和progress标签加入到该位置
        this.timer = setInterval(function () {
            if (meal1.progressValue < 10)
                progress.setAttribute("value", ++meal1.progressValue); //每隔一秒菜的进度加1
            else {
                h3.setAttribute("class", "mealName mealFinish meal_box1"); //设置菜做完成时的状态
                progress.remove();
            }

        }, 1000);
    }

    function orderMeal(placeId) //点击用户头像是进行点餐
    {
        windowPop("orderDishes"); //弹出菜单
        //修改菜单上按钮的onclick
        document.getElementById("finishOrder").setAttribute("onclick","cancelOrder("+placeId+")");
        document.getElementById("cancelOrder").setAttribute("onclick","cancelOrder("+placeId+")");
    }

    function cancelOrder(placeId) {
        windowCancel("orderDishes");
        leavePlace(placeId);
    }