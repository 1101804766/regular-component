var C = {
	ActionSheet: Regular.extend({
		name: 'ActionSheet',
		template: '<ul class="actionsheet" ref="actionsheet">' +
					'{#list items as item}' +
						'<li class="item" on-click={item.handler()} style="color:{item.color}">{item.name}</li>' +
					'{/list}' +
					'<li class="item" on-click={this.cancel()}>取消</li>' +
				  '</ul>' +
				  '<div class="mask" on-click={this.cancel()}></div>',
		cancel: function() {
			this.destroy();
		}
	}),

	Star: Regular.extend({
		name: 'Star',
		template: '<div class="star-bg">' +
						'<div class="stars">' +
							'{#list items as item}' +
								'<a href="javascript:;" data-level={item_key} on-click={this.render(item_key)}>{item}</a>' +
							'{/list}' +
						'</div>' +
						'<div class="bg-active" ref="star"></div>' +
					'</div>' +
					'{#if showLabel}' +
						'<p class="tc">{label || defaultText}</p>' +
					'{/if}',
		render: function(value) {
			var level = value || 0;
			var width = 30 * level + (level - 1) * 16;
			this.$refs.star.style.width = width + 'px';
			this.data.label = this.data.items[level];
		}
	}),

	Header: Regular.extend({
		name: 'Header',
		data: {
			title: '标题',
			isIos: /iphone|ipad|ipod/i.test(navigator.userAgent),
			buttonText: '',
			confirmCallback: function() {}
		},
		template: '<div class="title tc">' +
					  '{#if !isIos}' +
					  	  '<a href="javascript:;" class="icon icon-back"></a>' +
					  '{/if}' +
					  '<span>{title}</span>' +
					  '{#if buttonText}' +
					  	  '<a href="javascript:;" class="btn-link" on-click={confirmCallback()}>保存</a>' +
					  '{/if}' +
				  '</div>'
	}),

	Loading: Regular.extend({
		name: 'Loading',
		data: {
			loadingLabel: '加载中'
		},
		template: '<div class="weui_loading_toast">' +
					'<div class="weui_mask_transparent"></div>' +
					'<div class="weui_toast">' +
						'<div class="weui_loading">' +
							'<div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_1"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_2"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_3"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_4"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_5"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_6"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_7"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_8"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_9"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_10"></div>' +
							'<div class="weui_loading_leaf weui_loading_leaf_11"></div>' +
						'</div>' +
						'<p class="weui_toast_content">{loadingLabel}</p>' +
					'</div>' +
				'</div>'
	}),

	Toast: Regular.extend({
		name: 'Toast',
		data: {
			message: '提示',
			duration: 2000
		},
		template: '<div class="toast hide" ref="toast" style="visibility:hidden">{message}</div>',
		init: function() {
			var that = this;

			setTimeout(function() {
				var ref = that.$refs.toast;
				var style = getComputedStyle(ref, null);
				var paddingLeft = parseInt(style.paddingLeft);
				var width = parseInt(style.width) + paddingLeft * 2;
				ref.style.marginLeft = - width / 2 + 'px';
				ref.style.visibility = 'visible';
			}, 0);

			var t = setTimeout(function() {
				that.destroy();
				clearTimeout(t);
			}, that.data.duration);
		}
	}),
	Card: Regular.extend({
		name: 'Card',
		data: {
			headerImage: '',
			contentHtml: '',
			cancelBtnText: '取消',
			confirmBtnText: '确定',
			single: false,
			width: '',
			height: ''
		},
		template: '<div class="card" style="width: {width};height: {height}">' +
					  '{#if headerImage}' +
						  '<div class="card-header">' +
							'<img src={headerImage} alt="图片">' +
						  '</div>' +
					  '{/if}' +
					  '<div class="card-content" r-html={contentHtml}></div>' +
					  '<div class="card-footer">' +
						  '{#if !single}' +
						  		'<button class="btn btn-cancel" on-click={this.cancel()}>{cancelBtnText.substring(0, 3)}</button>' +
						  '{/if}' +
						  '<button class="btn btn-ok" on-click={this.confirm()}>{confirmBtnText.substring(0, 3)}</button>' +
					  '</div>' +
				  '</div>' +
				  '<div class="mask" on-click={this.cancel()}></div>',
		confirm: function() {
			this.data.confirmCallback && this.data.confirmCallback();
			this.destroy();
		},
		cancel: function() {
			this.data.cancelCallback && this.data.cancelCallback();
			this.destroy();
		}
	}),

	Upload: Regular.extend({
		name: 'Upload',
		data: {
			pictures: [],
			limitSize: true,
			size: 4
		},
		template: '<div class="upload-box">' +
						'{#if pictures.length}' +
							'<ul>' +
							'{#list pictures as pic}' +
								'<li class="item">' +
									'<img src={pic} alt="第{pic_index}张" on-click={this.preview(pic)}/>' +
								'</li>' +
							'{/list}' +
								'<li class="item">' +
									'<i class="icon icon-plus"></i>' +
								'</li>' +
							'</ul>' +
							'{#if currentImageSrc}' +
							 	'<div class="preview">' +
									'<img src={currentImageSrc} />' +
								'</div>' +
							'{/if}' +
						'{#else}' +
							'<div class="empty tc">' +
								'<input type="file" ref="upload" accept="image/*" class="upload-input" on-change={this.selectFile($event)} />' +
								'<i class="icon icon-plus"></i>' +
								'<p>上传图片</p>' +
							'</div>' +
						'{/if}' +
				  '</div>',
		preview: function(src) {
			this.data.currentImageSrc = src;
		},
		selectFile: function($event) {
			var files = $event.origin.files,
				maxNum = this.data.max,
				picLen = this.data.pictures.length;
			if (files.length) {
				if (files.length > maxNum - picLen) {
					C.showToast('最多还能选择' + (maxNum - picLen) + '张图片');
					return;
				}
				for (var i = 0; i < files.length; ++i) {
					var file = files[i];
					var fileName = file.name;
					var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
					if (!ext.match(this.data.suffix)) {
						C.showToast('上传文件必须为图片');
						continue;
					}
					if (this.data.limitSize && file.size > this.data.size * 1024 * 1024) {
						C.showToast('上传图片大小不能超过' + this.data.size + 'M');
						continue;
					}
					var fileSize = 0;
					if (file.size > 1024 * 1024) {
						fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
					} else {
						fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
					}

					this.uploadFile(file);
				}
			}
		},
		uploadFile: function(file) {
			var loadingObj = C.showLoading('上传中');

			var that = this;
			var fd = new FormData();
			fd.append(this.data.formDataKey, file);
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener('progress', this.uploadProgress, false);
			xhr.addEventListener('load', this.uploadComplete.bind(this, loadingObj), false);
			xhr.addEventListener('error', this.uploadFailed.bind(this, loadingObj), false);
			xhr.addEventListener('abort', this.uploadCanceled.bind(this, loadingObj), false);
			xhr.open('POST', this.data.uploadUrl);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					that.data.pictures.push(xhr.responseText);
				}
			};
			xhr.send(fd);
		},
		uploadProgress: function() {},
		uploadComplete: function(loadingObj) {
			loadingObj && loadingObj.destroy();
		},
		uploadCanceled: function(loadingObj) {
			loadingObj && loadingObj.destroy();
			C.showToast('取消上传');
		},
		uploadFailed: function(loadingObj) {
			loadingObj && loadingObj.destroy();
			C.showToast('上传失败');
		}
	}),

	showToast: function(msg, container) {
		container = container || document.body;
		new C.Toast({
		 	data: {
		 		message: msg
			}
		}).$inject(container);
	},

	showLoading: function(msg, container) {
		container = container || document.body;
		return new C.Loading({
			data: {
				loadingLabel: msg
			}
		}).$inject(container);
	}
};