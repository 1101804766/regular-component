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
    此组件用于打分，也就是我们常见的淘宝给商品评价打星星
