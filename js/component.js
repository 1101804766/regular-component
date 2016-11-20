require.config({
	baseUrl: '/static/m/js',
	paths: {
		'regular': 'lib/regular',
		'jquery.qqface': 'lib/jquery.qqFace',
		'dropload': 'lib/dropload.min',
		'owlCarousel': 'lib/owl.carousel.min'
	},
	shim: {
		'jquery.qqface': {
			deps: ['qqface']
		}
	}
});

define('component', ['regular'], function(Regular) {
	function doAjax(options) {
		$.ajax({
			url: options.url,
			type: options.type || 'GET',
			dataType: 'JSON',
			data: options.data || {},
			success: options.success || function() {},
			error: options.error || function() {}
		});
	}

	window.C = {
		ActionSheet: Regular.extend({
			name: 'ActionSheet',
			template: '<div class="actionsheet z5" ref="actionsheet">' +
						'{#list items as item}' +
							'<div class="item" on-click={item.handler()} style="color:{item.color}">{item.name}</div>' +
						'{/list}' +
						'<div class="item" on-click={this.destroy()}>取消</div>' +
					  '</div>' +
					  '<div class="mask z4" on-click={this.destroy()}></div>'
		}),

		Star: Regular.extend({
			name: 'Star',
			data: {
				level: 0
			},
			template: '<div class="star-bg">' +
							'<div class="stars" data-value={level}>' +
								'{#list items as item}' +
									'<a href="javascript:;" data-level={item_key} on-click={this.render(item_key)}>{item}</a>' +
								'{/list}' +
							'</div>' +
							'<div class="bg-active" ref="star"></div>' +
						'</div>' +
						'{#if showLabel}' +
							'<p class="tc">{label || defaultText}</p>' +
						'{/if}',
			init: function() {
				this.render(this.data.level);
			},
			render: function(value) {
				var level = value || 0;
				var width = 30 * level + (level - 1) * 16;
				this.$refs.star.style.width = width + 'px';
				this.data.label = this.data.items[level];
				this.data.level = level;
			}
		}),
		Dialog: Regular.extend({
			name: 'Dialog',
			data: {
				single: false,
				confirmBtnText: '确定',
				cancelBtnText: '取消',
				confirmCallback: function() {},
				cancelCallback: function() {}
			},
			template: '<div class="dialog tc z6">' +
						'<i class="icon icon-close">×</i>' +
						'<p class="title">{title}</p>' +
						'<div class="btn-group">' +
							'{#if !single}' +
					        	'<button class="btn btn-cancel" on-click={this.cancelCallback()}>{cancelBtnText}</button>' +
					        '{/if}' +
					        '<button class="btn btn-ok" on-click={this.confirmCallback($event)}>{confirmBtnText}</button>' +
					    '</div>' +
					  '</div>',
			init: function() {

			},
			cancelCallback: function() {
				this.data.cancelCallback();
				this.destroy();
			},
			confirmCallback: function() {
				this.data.confirmCallback();
				this.destroy();
			}
		}),

		Header: Regular.extend({
			name: 'Header',
			data: {
				title: document.title,
				isIos: /iphone|ipad|ipod/i.test(navigator.userAgent),
				buttonText: '',
				confirmCallback: function() {}
			},
			init: function() {
			},
			template: '<div class="title z5 tc">' +
						  '{#if !isIos}' +
						  	  '<a href="javascript:window.history.back()" class="icon icon-back"></a>' +
						  '{/if}' +
						  '<span>{title}</span>' +
						  '{#if buttonText}' +
						  	  '<a href="javascript:;" class="btn-link" on-click={confirmCallback()}>{buttonText}</a>' +
						  '{/if}' +
					  '</div>'
		}),

		FlexBox: Regular.extend({
			name: 'FlexBox',
			data: {
				column: 3,
				list: []
			},
			template: '<div class="flexbox tc">' +
						 '{#list list as data}' +
							'<div class="flex-column column{(column < 2 || column > 4) ? 3 : column}" on-click={data.handler($event)}>' +
								'<span class="icon {data.icon}"></span>' +
								'<p>{data.text ? data.text.slice(0, 5) : ""}</p>' +
							'</div>' +
						 '{/list}' +
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

		Comment: Regular.extend({
			name: 'Comment',
			template: '{#if page.totalResults || list.length}' +
						  '<div class="comment-title">全部评论 ({page.totalResults || list.length})</div>' +
						  '<div class="comment-box" id="commentContainer">' +
							  '{#list list as data}' +
							  	  '<div class="comment line">' +
									  '<div class="user-box">' +
									  	  '<a href="/people/{data.author_id}">' +
									  	  	'{#if showLevel && data.level}' +
									  	  		'<span class={data.level <= 7 ? "lv lv1" : (data.level <= 87 ? "lv lv2" : "lv lv3")}>LV{data.level}</span>' +
									  	  	'{/if}' +
									  	  	'<img src={data.authorpic} width="30" height="30" />' +
									  	  	'<span class="name">{data.authorname}</span>' +
									  	  	'{#if showVip && data.is_vip}' +
									  	  		'<span class="vip"></span>' +
									  	  	'{/if}' +
									  	  	'{#if showIdentifier}' +
									  	  		'{#if data.adminPriority}' +
									  	  			'<span class="identifier">{data.adminPriority}</span>' +
									  	  		'{/if}' +
									  	  	'{/if}' +
									  	  	'{#if showFloor}' +
									  	  		'<span class="floor">{data_index + 1}楼</span>' +
									  	  	'{/if}' +
									  	  '</a>' +
									  '</div>' +
									  '<div class="cnt" r-html={data.content} on-click={this.showActionSheet(data.commentId, data.isSelf, false)}></div>' +
									  '<div class="status-bar">' +
									  	  '<div class="left tl">' +
										  	  '<span class="time">{data.timelong || data.time}</span>' +
										  	  '{#if canDelComment}' +
											  	  '{#if data.isSelf || currentUserIdentifier === 50 || currentUserIdentifier === 51 || currentUserIdentifier === 128}' +
											  	  	'<span class="del" on-click={this.delComment(data.commentId, data.isReply)}>删除</span>' +
											  	  '{/if}' +
										  	  '{/if}' +
									  	  '</div>' +
									  	  '<div class="tr">' +
										  	  '{#if showReward}' +
										  	  	   '<a href="/pub_v2/readypay/?id={data.commentId}&type=3&bbsId={data.bbsid}"><i class="icon icon-shang"></i> <span>{data.pays.total || 0}</span></a>' +
										  	  '{/if}' +
										  	  '<a href="javascript:;" on-click={this.clickPraise($event, data.commentId)}><i class={data.isPraise ? "icon icon-heart cur" : "icon icon-heart"}></i> <span>{data.praised || 0}</span></a>' +
										  	  '<a href="javascript:;" on-click={this.showCommentDialog(true, data.commentId, data.isReply)}><i class="icon icon-comment"></i> <span>{data.replyinfo ? data.replyinfo.length : 0}</span></a>' +
									  	  '</div>' +
									  '</div>' +
									  '{#if data.replyinfo.length}' +
										  '<div class="comment-list">' +
											  '<i class="icon icon-comment"></i>' +
										  	  '{#list data.replyinfo as reply}' +
											  	  '<div class="item" on-click={this.showActionSheet(reply.id || reply.replyId, reply.isSelf, true, data.commentId)}>' +
											  	  	  '<span class="name">{reply.authorName}</span>{#if reply.replidName} 回复 <span class="name">{reply.replidName}</span>{/if}：' +
											  	  	  '<span class="cmt" r-html={reply.content}></span>' +
											  	  '</div>' +
										  	  '{/list}' +
										  '</div>' +
									  '{/if}' +
								  '</div>' +
							  '{/list}' +
						  '</div>' +
						  '<div class="comment-tips tc">{#if (page.totalResults - list.length) > 0}—— 还剩{page.totalResults - list.length}条评论 ——{#else}—— 没有更多评论了 ——{/if}</div>' +
					  '{/if}',
			data: {
				showVip: false,
				showIdentifier: false,
				showLevel: false,
				showFloor: false,
				showViewMore: false, // 是否截取帖子前100字，如果为true，将截取，并有【查看原文】
				showReward: /micromessenger/i.test(navigator.userAgent),
				currentUserIdentifier: 0,
				delCommentUrl: '/removeCommentById/',
				praiseCommentUrl: '/clickPraise/',
				canDelComment: true,
				dropload: true,
				list: [],
				page: {
					perPage: 10,
					currentPage: 2, // 刚进入页面，主页面已经请求了一次，所以这里从2开始
					totalResults: 0
				}
			},
			init: function() {
				var that = this;
				if (this.data.dropload) {
					require(['dropload'], function() {
						$('#commentBox').dropload({
				            scrollArea: window,
				            loadDownFn: function (me) {
				                that.getComments(function () {
				                    me.resetload();
				                });
				            }
				        });
					});
		        }
			},
			getComments: function(cb) {
				var that = this;
				doAjax({
					url: this.data.getCommentsUrl,
					data: {
						page: this.data.page.currentPage
					},
					dataType: 'JSON',
					type: 'GET',
					success: function(data) {
						if (data.data.length) {
							that.data.list = that.data.list.concat(data.data);
							that.data.page.totalResults = data.paging.totalCount;
							that.data.page.currentPage++;
							that.$update();
						} else {
							C.showToast('没有更多评论了');
						}
						cb && cb();
					},
					error: function() {
						cb && cb();
						C.showToast('请求失败，请重试');
					}
				});
			},
			delComment: function(id, isReply, commentId) {
				var that = this;
				if (window.confirm('确定要删除评论吗？')) {
					doAjax({
						url: that.data.delCommentUrl,
						data: {
							comment_id: id,
							isReply: isReply
						},
						type: 'POST',
						success: function(data) {
							if (data.ret === 0) {
								var comments = that.data.list;
								if (!commentId) {
									commentId = id;
								}
								for (var i = 0, len = comments.length; i < len; i++) {
									if (comments[i].commentId === commentId) {
										if (isReply) { // 删除回复
											for (var j = 0, l = comments[i].replyinfo.length; j < l; j++) {
												if (comments[i].replyinfo[j].replyId === id) {
													comments[i].replyinfo.splice(j, 1);
													that.$update();
													break;
												}
											}
										} else { // 删除评论
											that.data.list.splice(i, 1);
											that.$update();
										}
										break;
									}
								}
								C.showToast('删除成功');
							} else if (data.ret === -1) {
								C.showToast('不允许删除非本人评论~');
							} else {
								C.showToast('删除失败，请重试~');
							}
						},
						error: function() {
							C.showToast('删除失败，请重试');
						}
					});
				}
			},
			/**
			 * @param id 	    integer 当前点击评论/回复的id
			 * @param isSelf 	boolean 是否是自己发表的评论
			 * @param isReply	boolean 是回复别人，还是直接评论
			 * @param commentId integer 如果是回复，此id代表是评论的id
			 */
			showActionSheet: function(id, isSelf, isReply, commentId) {
				var items = [];
				var that = this;
				if (!isSelf) {
					items.push({
						name: commentId ? '回复' : '评论',
						handler: function() {
							actionsheet.destroy();
							that.showCommentDialog(true, id, isReply, commentId); // 可以回复评论，也可以回复评论的回复
						}
					});
				}
				if (isSelf || this.data.currentUserIdentifier === 128 || this.data.currentUserIdentifier === 50 || this.data.currentUserIdentifier === 51) {
					items.push({
						name: '删除',
						color: '#f00',
						handler: function() {
							actionsheet.destroy();
							if (that.data.canDelComment || isReply) {
								that.delComment(id, isReply, commentId);
							} else {
								C.showToast('置顶帖不允许删除评论');
							}
						}
					});
				}
				var actionsheet = new C.ActionSheet({
					data: {
						items: items
					}
				}).$inject(document.body);
			},
			showCommentDialog: function(supportQQFace, id, isReply, commentId) {
				var that = this;
				new C.CommentDialog({
					data: {
						supportQQFace: supportQQFace,
						refCommentId: id,
						isReply: isReply,
						commentId: commentId,
						refNode: that
					}
				}).$inject(document.body);
			},
			clickPraise: function(event, commentId) {
				doAjax({
					url: this.data.praiseCommentUrl,
					type: 'POST',
					data: {
						commentId: commentId
					},
					success: function(data) {
						if (data.retcode > 0) {
							var $origin = $(event.origin);
		                    if (!$origin.find('.icon').hasClass('cur')) {
		                        C.showToast('点赞成功' + (data.increaseScore > 0 ? '，积分+1' : ''));
		                    }
							$origin.find('.icon').toggleClass('cur');
							$origin.find('span').text(data.total);
		                } else {
		                	console.error('code=' + data.retcode);
		                    C.showToast('点赞失败');
		                }
					},
					error: function() {
						C.showToast('请求失败，请重试');
					}
				});
			}
		}),

		CommentDialog: Regular.extend({
			name: 'CommentDialog',
			data: {
				supportQQFace: false,
				replyCommentUrl: '/replied/',
				isReply: false,
				isComment: false,
				canDelComment: true,
				timelong: 15
			},
			template: '<div class="comment-dialog z5" ref="commentDialog">' +
						   '<i class="icon icon-close" on-click={this.destroy2()}>×</i>' +
						   '<textarea id="saytext" ref="saytext" maxlength="700" r-model={content} placeholder="说点什么吧，限1-700个字"></textarea>' +
						   '{#if supportQQFace}' +
						   		'<div class="emotion" ref="emotion" on-click={showQQFace = true}><i class="icon icon-emotion"></i></div>' +
						   '{/if}' +
						   '<div class="btn-group tr">' +
						   		'<button class="btn btn-cancel" on-click={this.destroy2()}>取消</button>' +
						   		'<button class="btn btn-pub" on-click={this.publish($event, commentId)} ref="okBtn">发表</button>' +
						   '</div>' +
						   '{#if supportQQFace}' +
						   		'<div class="qqface" r-hide={!showQQFace} id="QQface">' +
							        '<div class="carousel owl_1">' +
							            '<div id="owl-1" class="owl-carousel"></div>' +
							        '</div>' +
							    '</div>' +
							'{/if}' +
					  '</div>',
			init: function() {
				var that = this;
				if (!this.data.canDelComment) { // 如果是置顶帖
					var t;
					if (t) {
						clearInterval(t);
					} else {
						if (window.commentTimer) {
							var okBtn = that.$refs ? that.$refs.okBtn : null;
							if (!okBtn) return;
							if (window.timelong > 0) {
								$(okBtn).addClass('disabled');
								t = setInterval(function() {
									okBtn.innerText = window.timelong + 's';
									if (window.timelong <= 0) {
										okBtn.innerText = '发表';
										$(okBtn).removeClass('disabled');
										clearInterval(t);
									}
								}, 1000);
							}
						}
					}
				}
				if (this.data.supportQQFace) {
					require(['jquery.qqface',  'owlCarousel'], function() {
						var t = setTimeout(function() {
							$(that.$refs.emotion).qqFace({
					            id: 'QQface',
					            assign: 'saytext'
					        });
					        $('#owl-1').owlCarousel({
					            navigation: false,
					            slideSpeed: 300,
					            paginationSpeed: 400,
					            singleItem: true
					        });
							clearTimeout(t);
						}, 0);
					});
				}
				setTimeout(function() {
					that.data.scrollTop = $(window).scrollTop();
					$(that.$refs.commentDialog).siblings().addClass('hide');
				}, 0);
			},
			destroy2: function() {
				var t = this.data.scrollTop;
				$(this.$refs.commentDialog).siblings().removeClass('hide');
				$('html,body').animate({
					scrollTop: t
				}, 0);
				this.destroy();
			},
			publish: function(event, commentId) {
				var cnt = this.$refs.saytext.value || this.data.content, commentsObj, that = this;
				var $origin = $(event.origin);
				if (this.data.refNode) {
					commentsObj = this.data.refNode;
				}
				if (cnt && cnt.trim().length > 0 && cnt.trim().length <= 700) {
					if (!$origin.hasClass('disabled')) {
						$origin.addClass('disabled');
						var params = {content: cnt.trim()};
						if (this.data.isComment) {
							params.bbsId = this.data.refCommentId;
						} else {
							if (this.data.isReply) {
								params.replyId = this.data.refCommentId;
							} else {
								params.commentId = this.data.refCommentId;
							}
						}
						doAjax({
							url: that.data.replyCommentUrl,
							type: 'POST',
							data: params,
							success: function(data) {
								$origin.removeClass('disabled');
								if (data.retcode > 0) {
									C.showToast('发表成功');
									if (!that.data.canDelComment) {
										window.timelong = 15;
										window.commentTimer = setInterval(function() {
											window.timelong--;
											if (window.timelong <= 0) {
												clearInterval(window.commentTimer);
											}
										}, 1000);
									}
									// document.body.style.position = 'inherit';
									// document.body.style.overflow = 'auto';
									that.destroy2();
									var comments = commentsObj.data.list;
									if (that.data.isComment) {
										data.data.content = that.contentFilter(data.data.content);
										comments.push(data.data);
										commentsObj.$update();
									} else {
										for (var i = 0, len = comments.length; i < len; i++) {
											var item = comments[i];
											if (item.commentId === that.data.commentId || item.commentId === that.data.refCommentId) {
												data.data.content = that.contentFilter(data.data.content);
												item.replyinfo = item.replyinfo || [];
												item.replyinfo.push(data.data);
												commentsObj.$update();
												break;
											}
										}
									}
								} else {
									$origin.removeClass('disabled');
									console.error('code=' + data.retcode);
									C.showToast('发表失败');
								}
							},
							error: function() {
								C.showToast('发表失败，请重试');
							}
						});
					}
				} else {
					C.showToast('评论内容字数要求1-700字');
				}
			},

			contentFilter: function(content) {
				var newContent = content.replace(/<[^>]+>/g, ''); // html标签的过滤
        		return QQFace.transEmoji(newContent);
			}
		}),

		Toast: Regular.extend({
			name: 'Toast',
			data: {
				message: '提示',
				duration: 2000
			},
			template: '<div class="toast zF" ref="toast" style="visibility:hidden">{message}</div>',
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
				height: '',
				allowClose: true
			},
			template: '<div class="card z5" style="width: {width};height: {height}">' +
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
					  '<div class="mask z4" on-click={this.cancel()}></div>',
			confirm: function() {
				this.data.confirmCallback && this.data.confirmCallback();
				// this.destroy();
			},
			cancel: function() {
				this.data.cancelCallback && this.data.cancelCallback();
				if (this.data.allowClose) {
					this.destroy();
				}
			}
		}),

		Upload: Regular.extend({
			name: 'Upload',
			data: {
				pictures: [],
				limitSize: true,
				size: 4,
				multiple: true,
				formDataKey: '',
				uploadUrl: ''
			},
			template: '<div class="upload-box">' +
							'{#if pictures.length}' +
								'<ul>' +
								'{#list pictures as pic}' +
									'<li class="item">' +
										'<span class="icon-delete" on-click={this.deleteImg(pic)}></span>' +
										'<img src={pic} alt="第{pic_index + 1}张" on-click={this.preview(pic)}/>' +
									'</li>' +
								'{/list}' +
									'<li class="item">' +
										'<input type="file" accept="image/*" multiple={multiple} class="upload-input" on-change={this.selectFile($event)} />' +
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
									'<i class="icon icon-plus"></i>' +
									'<p>上传图片</p>' +
									'<input type="file" accept="image/*" multiple={multiple} class="upload-input" on-change={this.selectFile($event)} />' +
								'</div>' +
							'{/if}' +
					  '</div>',
			init: function() {
				this.$watch('pictures', function(newVal, oldVal) {
					if (this.data.cat === 'dktfood') {
						sessionStorage.foodData = JSON.stringify({
							foodImgs: newVal
						});
					} else if (this.data.cat === 'dktsport') {
						sessionStorage.sportData = JSON.stringify({
							sportImgs: newVal
						});
					}
				});
			},
			preview: function(src) {
				this.data.currentImageSrc = src;
			},
			deleteImg: function(src) {
				for (var i = 0, len = this.data.pictures.length; i < len; i++) {
					this.data.pictures.splice(i, 1);
				}
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
				fd.append('randomCode', window.randomCode);
				fd.append('cat', this.data.cat);
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
				this.$update();
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
});
