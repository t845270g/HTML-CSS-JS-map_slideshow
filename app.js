const img = document.querySelector( ".img" );//取得圖片標籤
const box = document.querySelector( ".box" );//放置圖片的容器

let imgWidth = img.width;//圖片寬度
let 頁面 = document.documentElement.clientWidth;//視窗寬度
let limit = imgWidth - 頁面;//圖片與視窗的差，代表圖片可以左右移動的距離
let ani = `@keyframes 移動畫面{from{
                                  transform: translate(0px,0px)
                               }to{
                                  transform: translate(-${ limit }px,0px)
                               }
           }`;//製作動畫樣式，移動距離套用limit參數

//在HTML中的head tag 寫入子標籤<style>，並將自訂的動畫樣式放進去
let dynamicStyles = null;
//新增動畫樣式
function addAnimation(動畫) {
                              if ( !dynamicStyles ) {
                                  dynamicStyles = document.createElement('style');//建立寫CSS的style標籤，type="text/css" 可以省略
                                  dynamicStyles.type = 'text/css';//(可略)
                                  document.head.appendChild(dynamicStyles);//在文件document的<head>標籤中新增子標籤
                                }
                               dynamicStyles.sheet.insertRule(動畫);
                            }
//初始化視窗
window.onload = () => { 
                      addAnimation(ani);//讀取圖片可以左右移動的距離參數 給 樣式規則，並新增動畫樣式。
                      
                      if( limit > 0 ){//如果圖片可以左右移動的距離是正數
                          img.style = "animation: infinite 2s 移動畫面 linear alternate;"//設定左右移動的動畫
                      } else {//如果視窗寬度可以顯示整張圖片
                        img.style = "";
                        img.style = `left:${ (頁面 - imgWidth) / 2 }px`;//將圖片顯示在視窗正中間
                      }
                  };
//當視窗調整大小
window.onresize = () => { 
                        imgWidth = img.width;//重取圖片寬度
                        頁面 = document.documentElement.clientWidth;//重取視窗寬度
                        limit = imgWidth - 頁面;//重取可以圖片左右移動的距離
                        box.style = "width:100%;height:100%;";//不論怎麼調整視窗，都將放圖片標籤的容器諞滿整個視窗

                        //如果視窗寬度無法顯示整張圖片
                        if ( limit > 0 ) {
                                    //製作動畫樣式，移動距離套用limit參數
                                    ani = `@keyframes 移動畫面{from{
                                                                  transform: translate(0px,0px)
                                                               }to{
                                                                  transform: translate(-${ limit }px,0px)
                                                               }
                                          }`;

                                    addAnimation(ani);//新增一個重新取得的左右移動範圍的參數(limit)，此時會有兩個動畫樣式
                                    if (document.styleSheets[1].cssRules.length > 1) {//判斷如果文件(document)中的樣式(styleSheets)的動畫樣式([1])的動畫數量(.cssRules.length)因為新增而超過原本的數量時
                                                                                    document.styleSheets[1].removeRule([1]) ;//就去刪除最後一個，因為新增的動畫樣式會被放在第0個
                                                                                    console.log(document.styleSheets[1].cssRules);//檢查動畫樣式移動距離的值
                                                                                    console.log(limit)//檢查移動距離應該要有的值
                                                                                  };
                                    img.style = "animation: infinite 2s 移動畫面 linear alternate;";//新增左右移動的動畫
                                    //之所以一定要再寫一次，是因為如果葉面可以裝下一整張圖的時候執行了else的程式碼，會因為img.style=""把原本的動畫設定給洗掉
                                    //如果之後又調成圖片在視窗中裝不下，沒有這行，動畫就會消失
                        } else {
                          img.style = "";
                          img.style = `left:${ (頁面 - imgWidth) / 2 }px`;//將圖片顯示在視窗正中間
                        }
                      }
