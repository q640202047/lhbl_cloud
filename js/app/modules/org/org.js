$(function() {
	var OrgManager = function() {
		this.targetObj = $("#org");
		this.initEvent();
		this.initOrgForm();
		this.initOrgTree();
		this.initOrgGrid('orgId');
		this.orgId;
		this.orgName;
	}

	OrgManager.prototype = {
		initEvent : function() {
			var thisObj = this;
			var that = this.targetObj;
			
			that.find("#org_add").on("click", function() {
				console.log(thisObj.orgId);
				console.log(thisObj.orgName);
				if (!thisObj.orgId) {
					$.messager.alert("温馨提示","请选择父机构！");
					return;
				}
				that.find("#parentId").val(thisObj.orgId);
				that.find("#parentName").val(thisObj.orgName);
				that.find("#orgWrap").dialog("open");
			});
		},
		query : function(orgId) {
			var that = this.targetObj;

			$.ajax({
				type : 'post',
				url : JsUtils.getRootPath() + "/org/query",
				data: {parentId: orgId},
				success : function(data) {
					that.find('#orgGrid').datagrid(
						"loadData", {rows: data.data}
					);
				}
			});
		},
		initOrgForm: function() {
			var thisObj = this;
			var that = this.targetObj;
			that.find("#orgWrap").dialog({
				title:"机构表单", 
				autoOpen: false,
				backdrop: "static",
				buttons: {
	              "提交": function() {
	            	  var parentId = that.find("#parentId").val(),
	            	  	name = that.find("#name").val(),
	            	  	shortName = that.find("#shortName").val(),
	            	  	type = that.find("#type").val(),
	            	  	contacts = that.find("#contracts").val(),
	            	  	telephone = that.find("#telephone").val();
	            	  $.ajax({
		    				type : 'post',
		    				data: {
		    					parentId:parentId,
		    					name:name,
		    					shortName:shortName,
		    					type:type,
		    					contacts:contacts,
		    					telephone:telephone
		    				},
		    				url : JsUtils.getRootPath() + "/org/add",
		    				success : function(data) {
		    					that.find("#orgWrap").dialog("close");
		    					thisObj.query(null);
		    					thisObj.initOrgTree();
		    				}
		      			});
	              },
	              "关闭": function() {
	                  $(this).dialog("close");
		          }
				}
			});
		},
		initOrgTree : function() {
			var thisObj = this;
			var that = this.targetObj;

			$.ajax({
				type : 'post',
				url : JsUtils.getRootPath() + "/org/query_tree",
				success : function(data) {
					console.log(data.data);
					that.find('#orgTree').treeview({
						data : data.data, 
						levels : 5
					}).on('nodeSelected', function(event, data) {
						thisObj.orgId = data.id;
						thisObj.orgName = data.text;
						thisObj.query(data.id);
					});
				}
			});
		},
		initOrgGrid : function(orgId) {
			var thisObj = this;
			var that = this.targetObj;

			that.find('#orgGrid').datagrid({
				columns : [[ {
					field : 'name',
					title : '机构名称'
				}, {
					field : 'shortName',
					title : '机构简称'
				}, {
					field : 'type',
					title : '类型',
					formatter: function(val) {
						switch(val) {
						case "1": return "总公司"; case "2": return "分公司"; case "3": return "部门";
						}
					}
				}, {
					field : 'contacts',
					title : '联系人'
				}, {
					field : 'telephone',
					title : '联系电话'
				}, {
					field : 'id',
					title : '操作',
					formatter: function(val) {
						return "<button type=\"button\" class=\"btn btn-link\">链接按钮</button>";
					}
				} ]]
			});

			thisObj.query(null);
		},
		checkForm : function() {

		},
		clearForm : function() {

		},
		initForm : function(row) {

		}
	}

	new OrgManager();
});