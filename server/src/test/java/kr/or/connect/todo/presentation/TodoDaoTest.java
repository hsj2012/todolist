package kr.or.connect.todo.presentation;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import ch.qos.logback.core.net.SyslogOutputStream;
import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TodoDaoTest {
	
	@Autowired
	private TodoDao dao;
	
	@Autowired
	WebApplicationContext wac;
	MockMvc mvc;
	
	@Test
	public void shouldCount(){
		List<Todo> list = dao.allList();
		System.out.println(list.size());
		for (Todo todo : list) {
			System.out.println(todo);
		}
	}
	
	//@Test
	public void shouldInsertAndSelect(){
		// given
		Todo todo = new Todo("test",0);
		// when
		System.out.println(dao.insert(todo));
	}
	
	//@Test
	public void shouldDelete(){
		
		// when
		int affeted = dao.delete(9);
		
		System.out.println(affeted);
	}
	
	@Test
	public void shouldUpdate(){
		// Given
		Todo todo = new Todo("test", 0);
		Integer id = dao.insert(todo);

		// When
		todo.setId(id);
		todo.setState(1);
		// Then
		System.out.println(dao.update(todo));
	}

}
