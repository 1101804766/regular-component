# regular-component
regular常用组件

## 1、ActionSheet弹出菜单
   此组件接收一个菜单列表的数组。注意，此组件已经默认给出了最后一个选项[取消]，所以传进来的参数里，不必加上取消这一项。
   调用方式如下：

```javascript
var items = [{
 name: '评论',
 handler: function() {
   actionsheet.destroy();
   // TODO
 }
}, {
 name: '删除',
 color: '#f00',
 handler: function() {
     actionsheet.destroy();
     // TODO
 }
}];
var actionsheet = new C.ActionSheet({
 data: {
   items: items
 }
}).$inject(document.body);
```
## 2、Star组件
   调用时，直接传入level的值就可以了，取值为[0, 5]，取值0时，一颗星都不选中。
```javascript
var star = new C.Star({
    data: {
        defaultText: '请选择',
        showLabel: true,
        level: 5,
        items: {
            1: '心情很差',
            2: '心情一般',
            3: '心情比较好',
            4: '心情非常好',
            5: '心情超级好'
        }
    }
}).$inject('#conatiner'));
```

## 3、FlexBox组件
   这里针对多栏布局，比如微信钱包功能里面的布局方式，每栏的上面是icon，下面文字（这里文字最多5个字，超过截取前5个字）。
```javascript
var flexbox = new C.FlexBox({
    data: {
        column: 3, // 默认三列布局，支持2、3、4
        list: [
            {
               icon: 'icon-didi',
               text: '滴滴出行',
               handler: function() {
                
               }
            },
            {
               icon: 'icon-train-ticket',
               text: '火车票',
               handler: function() {
               
               }
            },
            
            {
               icon: 'icon-hotel',
               text: '酒店',
               handler: function() {
               
               }
            },
            {
               icon: 'icon-meilishuo',
               text: '美丽说',
               handler: function() {
               
               }
            },
            ...
        ]
    }
}).$inject('#container');
```
## 4、Loading组件
   也就是通常我们看到的加载中的转菊花效果。调用非常简单，component.js里面封装了一个showLoading的方法，直接调用：
```javascript
var loadingObj = C.showLoading('正在加载');
```
## 5、Toast组件
   模拟android和iOS里面的toast，接收message和duration(经过多长时间消失，默认2s) 2个参数。可以直接调用component.js里面封装好的showToast方法，直接调用：
```javascript
C.showToast('操作成功！');
```

## 6、Dialog组件
   对话框组件，支持简单的对话框，调用方式：
```javascript
var dialog = new C.Dialog({
    data: {
        single: false,
        confirmBtnText: '确定',
        cancelBtnText: '取消',
        confirmCallback: function() {},
        cancelCallback: function() {}
    }
}).$inject(document.body);
```

未完待续
