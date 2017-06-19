 /**
  * ------------------------------------------------------------------
  * fancytree封装
  * ------------------------------------------------------------------
  */
 $(function() {
     var glyph_opts = {
         map: {
             doc: "glyphicon glyphicon-file",
             docOpen: "glyphicon glyphicon-file",
             checkbox: "glyphicon glyphicon-unchecked",
             checkboxSelected: "glyphicon glyphicon-check",
             checkboxUnknown: "glyphicon glyphicon-share",
             dragHelper: "glyphicon glyphicon-play",
             dropMarker: "glyphicon glyphicon-arrow-right",
             error: "glyphicon glyphicon-warning-sign",
             expanderClosed: "glyphicon glyphicon-menu-right",
             expanderLazy: "glyphicon glyphicon-menu-right", // glyphicon-plus-sign
             expanderOpen: "glyphicon glyphicon-menu-down", // glyphicon-collapse-down
             folder: "glyphicon glyphicon-folder-close",
             folderOpen: "glyphicon glyphicon-folder-open",
             loading: "glyphicon glyphicon-refresh glyphicon-spin"
         }
     };

     //默认配置
     var defaultOptions = {
         minExpandLevel: 20,
         checkbox: true,
         glyph: glyph_opts,
         selectMode: 3, //选中子节点也默认选中父节点
     };

     //树菜单配置
     var treeMenuOptions = $.extend(defaultOptions, {
         extensions: ["dnd", "edit", "glyph"],
     });

     //树列表配置
     var treeTableOptions = $.extend(defaultOptions, {});

     /************************************************************************/

     //将方法绑定到jQuery对象上
     $.fn.extend({
         treeInit: treeInit,
         treetableInit: treetableInit,
         treeSetData: treeSetData,
         treeExpendAll: treeExpendAll,
         treeGetInstance : treeGetInstance,
         treeCloseAll : treeCloseAll,
         treeDisable : treeDisable,
         treeSelectAll : treeSelectAll,
         treeUnSelectAll : treeUnSelectAll
     });

     //构造树菜单
     function treeInit(options) {
         return $(this).fancytree($.extend(treeMenuOptions, options));
     }

     //构造树列表
     function treetableInit(options) {
         return $(this).fancytree(options);
     }

     //填充数据
     function treeSetData(data) {
         return $(this).fancytree("option", "source", data);
     }

     //展开全部节点
     function treeExpendAll() {
         $(this).fancytree('getTree').visit(function(node) {
             node.setExpanded(true);
         });
     }

     function treeCloseAll(){
        $(this).fancytree('getTree').visit(function(node) {
             node.setExpanded(false);
         });  
     }

     //获取tree对象
     function treeGetInstance(){
        return $.ui.fancytree.getTree($(this));
     }

     //设置禁用
     function treeDisable(){
        var widget = $(this),
            isDesable = widget.fancytree("option", "disabled");

        if(isDesable){
            widget.fancytree('enable');
        }else{
            widget.fancytree("disable");
        }
     }

     //全选所有
     function treeSelectAll(){
        $(this).treeGetInstance().visit(function(node){
            node.setSelected(true);
        });
     }
     
     //取消全选所有
     function treeUnSelectAll(){
        $(this).treeGetInstance().visit(function(node){
            node.setSelected(false);
        });
     }

 });
