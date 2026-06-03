package ecommerce;

import ecommerce.model.Product;
import ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ProductRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				Product p1 = new Product();
				p1.setName("\"ADMIN\" HEAVY HOODIE");
				p1.setDescription("100% Cotton. Puff Print.");
				p1.setPrice(85.00);
				p1.setTag("500GSM");
				p1.setImageUrl("img/hoodie.jpg");
				repository.save(p1);

				Product p2 = new Product();
				p2.setName("GLITCH TACTICAL VEST");
				p2.setDescription("Ballistic Nylon. Modular.");
				p2.setPrice(120.00);
				p2.setTag("LAST_UNITS");
				p2.setImageUrl("img/vest.jpg");
				repository.save(p2);

				Product p3 = new Product();
				p3.setName("ERROR 404 BOXY TEE");
				p3.setDescription("Vintage finish. Exposed seams.");
				p3.setPrice(45.00);
				p3.setTag("ACID_WASH");
				p3.setImageUrl("img/tee.jpg");
				repository.save(p3);

				Product p4 = new Product();
				p4.setName("FIREWALL PARACHUTE");
				p4.setDescription("8 Pockets. Adjustable fit.");
				p4.setPrice(95.00);
				p4.setTag("WATERPROOF");
				p4.setImageUrl("img/pants.jpg");
				repository.save(p4);

				System.out.println(">> SYSTEM: BASE DE DATOS INICIALIZADA CON PRODUCTOS NPC <<");
			}
		};
	}
}