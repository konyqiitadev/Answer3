define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.flxContents.isVisible=true;
            this.view.flxTemplate.isVisible=false;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            /*
            サンプル
            [{"name":"ホーム","page":"frmMain","disabled":true}]
            */
            defineGetter(this, 'data', () => {
                return this._data;
            });
            defineSetter(this, 'data', value => {
                this._onLayout(value);
                this._data = value;
            });
        },
        _onLayout:function(value){
          var self = this;
          // 要素を削除
          this.view.flxArea.removeAll();
          self.view.btnTitle.hoverSkin=self.view.btnTitle.focusSkin;
          if(value && Array.isArray(value) ){
            value.map((v,index)=>{
              if(v.disabled !== true){
                btnObj =  self.view.btnTitle.clone("btnBreadcrumb"+index);
                btnObj.skin = 'sknBtnSmalLink'
                btnObj.text=v.name;
                btnObj.onClick = function(){
                  const page = new kony.mvc.Navigation(v.page);
                  page.navigate();
                };
                self.view.flxArea.add(btnObj);
              }else{
                btnObj =  self.view.btnTitleUnlink.clone("btnBreadcrumb"+index);
                btnObj.skin = 'sknBtnSmalUnLink'
                btnObj.text=v.name;
                self.view.flxArea.add(btnObj);
              }
              
              if(index<value.length-1){
                var imgObj =self.view.imgArrowRight.clone("imgBreadcrumb"+index);
                imgObj.src=self.view.imgArrowRight.src;
                self.view.flxArea.add(imgObj);
              }
            });
          }
        }
	};
});