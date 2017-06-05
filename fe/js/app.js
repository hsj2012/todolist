(function (window) {
	var count = 0;
	var list;
	'use strict';
	
	// 화면 초기화
	listData();
		
	/**
	 * 이벤트 등록
	 */
		
	/** 입력 이벤트 (엔터) */
	$('.new-todo').keyup(function(event){
		
		// enter
		if(event.keyCode == 13 ){
			// 빈 문자열일 경우
			if($('.new-todo').val().replace(/\s/g,"").length==0){ alert('내용을 입력하세요'); $('.new-todo').val(''); return false;}
			
			var text = $('.new-todo').val();
			var new_todo = {content : text, state : 0};
			var stodo = JSON.stringify(new_todo);
			$.ajax({
				type : 'post',
				url : '/api/todos',
				data : stodo,
				contentType : "application/json; charset=UTF-8",
				success : function(data){
					$('.new-todo').val('');
					var string = appendList(data);
					$('.todo-list').prepend(string);
				}
			});
		}
	});
		
	/** 삭제 이벤트 */
		
	$(document).on('click','.destroy',function(){
		deleteTodo($(this).parent().parent());
	});
	

		
	/** 상태 업데이트 이벤트 */
	$(document).on('change','.toggle',function(){
		var check = $(this);
		var state = 0;
		var id = check.parent().find('button').attr('id');
		
		($(this).is(':checked'))?state=1:state=0;
		var new_todo = {id : id, state : state};
		var stodo = JSON.stringify(new_todo);
		$.ajax({
			type : 'put',
			url : "/api/todos/"+id,
			data : stodo,
			contentType : "application/json; charset=UTF-8",
			success : function(){
				// 미완료 -> 완료
				if(state === 1){
					check.parent().parent().attr('class','completed');
					check.parent().parent().find('input').attr('value','Rule the web');
					countSet(--count);
				// 완료 -> 미완료
				}else if(state ===0){
					check.parent().parent().removeAttr('class');
					check.parent().parent().find('input').attr('value','Create a TodoMVC template');
					countSet(++count);
				}
			
			}
		});
	});
		
	/** 필터 이벤트 */
	$('.filters > li > a').on('click',function(event){
		$('.filters > li > a').removeAttr('class');
		// a태그 이벤트 삭제
		event.preventDefault();
		var aTag = $(this);
		if($(this).text() == 'Active'){
			aTag.attr('class','selected');
			$('.todo-list > li').not('li.completed').show();
			$('.todo-list > li.completed').hide();
		}else if($(this).text() == 'Completed'){
			aTag.attr('class','selected');
			$('.todo-list > li').not('li.completed').hide();
			$('.todo-list > li.completed').show();
		}else{
			aTag.attr('class','selected');
			$('.todo-list > li').show();
		}
	});
	
	
	/** 완료한 일들 삭제 이벤트 */
		
	$('.clear-completed').on('click',function(){
		$('.todo-list > li.completed').each(function(index,value){
			deleteTodo(value);
		});
	});
	
	/**
	 * 함수
	 */
	
	/** todo-list 가져오기(서버) */
	function listData(){
		$.ajax({
	        url : "/api/todos",
	        success : function(data) {
	          todoList(data);
	        }
	      });
	};
	
	
	/** 할 일 삭제  */
	function deleteTodo(completed){
		var todoId = $(completed).find('button').attr('id');
		$.ajax({
			type : 'delete',
			url : "/api/todos/"+todoId,
			contentType : "application/json; charset=UTF-8",
			success : function(){
				// 할 일 수 갱신
				if(!($(completed).attr('class'))){alert(completed); countSet(--count)};
				completed.remove();
			}
		});
	};
	
	/**
	 * 할 일 리스트 만들기 */
	function appendList (todo){
		var string = '';
		var classType=' class = completed';
		var inputValue='Rule the web';
		var isCheck = 'checked';
		
		if(todo.state == 0) { // 새로운 할 일
			classType='';
			inputValue='Create a TodoMVC template';
			isCheck = '';
			countSet(++count);
		}
		string += '<li'+classType+'>'
			+'<div class="view">'
			+'<input class="toggle" type="checkbox" '+isCheck+'>'
			+'<label>'+todo.content+'</label>'
			+'<button class="destroy" id='+todo.id+'></button>'
			+'</div>'
			+'<input class="edit" value='+inputValue+'>'
		 +'</li>';
		return string;
	};
	
	/** to-do리스트 만들기 */
	function todoList(list){
		// list 초기화
		$('.todo-list').empty();
		$.each(list, function(index, value){
			var string = appendList(value);
			$('.todo-list').append(string);
		});
	};
	
	/** 할 일 수 변화  */
	function countSet(count){
		//var reg =  /^\d+$/;
		//alert(reg.test(-1));
		$('.todo-count').find('strong').text(count);
	};

})(window);
