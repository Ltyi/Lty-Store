# Lty Store

**此為電商網站的練習作品 (無金流)**  
主要使用 Vue.js 2.6.1 / Vuetify 2.x / Firebase  
[前台DEMO](https://lty-store.firebaseapp.com)  
[後台](https://github.com/Ltyi/Lty-Store-ADMIN)  

---

## Firebase Cloud Firestore & Storage

網站資料後台使用Firebase，主要包含產品、分類、訂單、會員資料以及圖片檔案  
而此網站主要呈現產品資訊以及購物車功能(無金流)  
firestore中的資料會利用[Vuexfire](https://github.com/posva/vuexfire)綁定至Vuex中實時更新

### Firebase 內的資料
  - 產品分類及對應品牌
  - 產品資訊
  - 訂單資訊
  - 用戶資訊

## 會員註冊、登入

使用Email與密碼註冊會員帳號，目前不進行驗證  
此為Firebase的**Authentication**服務，登入後則可以進行結帳動作

## 產品列表

預設排序為後台建立的排序，可以切換為價格排序  

## 加入購物車

購物車使用**LocalStorage**儲存在客戶端，不限定登入會員才能加入購物車  

## 結帳

結帳時需要登入會員，填寫訂單資訊包含收件人資訊等  
第一次結帳可以選擇將收件人資訊保存，則下一次結帳時會代入上一次的資訊  
按下**送出訂單**之後就會將訂單內容推送到資料庫中的訂單資訊中  

## 訂單查詢

會員登入後可以查詢自己的過往訂單紀錄及明細，目前無修改功能。

--- 

## 未來預計新增功能

  - 會員資料修改
  