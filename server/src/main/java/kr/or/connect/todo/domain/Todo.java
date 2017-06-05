package kr.or.connect.todo.domain;

public class Todo {
	private Integer id;
	private String content;
	private Integer state;
	public Integer getId() {
		return id;
	}
	
	public Todo() {
	}
	
	public Todo(String content, Integer state) {
		this.content = content;
		this.state = state;
	}





	public void setId(Integer id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	@Override
	public String toString() {
		return "Todo [id=" + id + ", content=" + content + ", state=" + state + "]";
	}
	
	
}
