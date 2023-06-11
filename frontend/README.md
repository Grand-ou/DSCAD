# SADproject

See the prototype [here](https://www.figma.com/file/iK8R0LcVT7Mw7beRKZHCDj/SAD-basketball-dataCollection?node-id=35%3A0).


目前整個react native 會占用 port：19000、190002、19006， 
```
cd 這個Project

npm start
```
選用網頁開啟（`Press w │ open web`）輸入 `w`，
就可以在 `http://localhost:19006` 看到成果。



為了開啟資料庫，我們還要再開一個 port：7777。  
（只要你想看登入註冊的功能，你就要起這個 port 把資料庫跑在上面）  
（只要你有要使用資料庫的任何功能，你也就要起這個 port 把資料庫跑在上面）  
```
# 進到 server 資料夾
cd server

# 用另一個 terminal 啟動 app.js 檔案，開著別關，關了資料庫就連線中斷了。
node app.js 
```
port 7000 起成功的話 terminal 會顯示 `RUN http://localhost:7000`  

---
出現任何問題都自己`yarn add`解決看看，  
資料庫的`app.js`和`登入註冊`的部分，我有至少使用了：  
* yarn add express
* yarn add mysql
* yarn add axios
* yarn add cors  
可以先裝一裝。
