INSERT INTO department (name)
VALUES ("Sales"),
    ("Marketing"),
    ("Finance"),
    ("Customer Support"),
    ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Account Executive", 60000, 1),
       ("Sales Development Representative", 75000, 1),
       ("Regional Sales Manager", 100000, 1),
       ("Marketing Manager", 50000, 2),
       ("Digital Marketing Specialist", 45000, 2),
       ("Content Marketing Manager", 55000, 2),
       ("Financial Analyst", 50000, 3),
       ("Investment Banking Analyst", 80000, 3),
       ("Chief Financial Officer (CFO)", 150000, 3),
       ("Customer Support Representative", 35000, 4),
       ("Customer Support Team Lead", 45000, 4),
       ("Customer Success Manager", 55000, 4),
       ("Software Developer", 80000, 5),
       ("Network Engineer", 95000, 5),
       ("Data Scientist", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah","Johnson",1,NULL),
        ("Michael","Smith",2,1),
        ("Emily","Davis",3,2),
        ("Christopher","Anderson",4,3),
        ("Jessica","Martinez",5,4),
        ("Kevin","Brown",6,5),
        ("Olivia","Wilson",7,6),
        ("Robert","Taylor",8,7),
        ("Jennifer","Jones",9,8),
        ("William","Jackson",10,9),
        ("Elizabeth","Harris",11,10),
        ("David","Thompson",12,11),
        ("Ashley","White",13,12),
        ("Matthew","Miller",14,13),
        ("Lauren","Robinson",15,14);       
