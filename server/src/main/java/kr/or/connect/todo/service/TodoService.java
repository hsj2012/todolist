package kr.or.connect.todo.service;

import java.util.Collection;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	
	private TodoDao dao;
	
	public TodoService(TodoDao dao) {
		this.dao = dao;
	}

	
	/**전체 리스트*/ 
	public Collection<Todo> allList(){
		return dao.allList();
	}
	
	/**할 일 수*/ 
	public int count(){
		return dao.count();
	}
	
	/** 새로운 할 일 삽입*/ 
	public Todo insert(Todo todo){
		todo.setId(dao.insert(todo));
		return todo;
	}
	
	/** 할 일 삭제하기 */
	public boolean delete(Integer id){
		int deleted = dao.delete(id);
		return deleted == 1;
	}
	
	/** 할 일 상태 변화 */
	public boolean update(Todo todo){
		int updated = dao.update(todo);
		return updated == 1;
	}
	
}
