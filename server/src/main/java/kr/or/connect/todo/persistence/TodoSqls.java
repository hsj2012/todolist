package kr.or.connect.todo.persistence;

/**
 * TodoDao에서 사용할 sql문 
 *
 */
public class TodoSqls {
	static final String DELETE_BY_ID ="DELETE FROM todo WHERE id= :id";
	
	// 모든 리스트 불러오기
	static final String ALL_LIST= "SELECT id, content, state FROM todo order by id desc";
	
	// 리스트 수
	static final String COUNT = "SELECT COUNT(*) FROM todo";
	
	// 리스트 삭제하기
	static final String DELETE = "DELETE FROM todo WHERE id = :id";
	
	// 할 일 완료하기
	static final String UPDATE =
			"UPDATE todo SET\n"
			+ "state = :state\n"
			+ "WHERE id = :id";
}
