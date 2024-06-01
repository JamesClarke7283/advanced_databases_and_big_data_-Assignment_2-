# Video Talking Points

## Introduction & Roles

---

### Speaker: James

Discuss the task brief, what we have been tasked to do & breif mention of their role in the project (**Frontend,** **DB Backend**, **Data Cleaning Scripts**, **Project Manager**).

---

**Duration:** ***<u>2 minutes.</u>***

---

### Speaker Ryan

A short personal introduction, including mention of their roles (**DB Backend**, **DB Quiries**, **Data Cleaning Scripts**).

---

**Duration:** ***<u>1 minute</u>***

---

### Speaker: Jose

 A short personal introduction, mentioning their roles (**Report Writing**, **Frontend, Planning of Task**).

---

**Duration:** ***<u>1 minute</u>***

---



# Technologies used

## Speaker: James

Mention that the tech stack we used, what each part is and why we used them. Look at the problem the framework is trying to solve.

<u>***Note:***</u> ***Please explain that we choose MariaDB due to more free licensing and better cross platform compatibility (Mysql server did not work on our system)***

| **Component Type**             | **Component of Stack Name**        | What is it?                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Reason for use**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Programming Language & Runtime | **TypeScript** & **Deno**          | JavaScript but with static typing, Deno is a javascript runtime with out of the box TypeScript support (No TSconfig nessesary)                                                                                                                                                                                                                                                                                                                                     | ***TypeScript***<br/>Since you can **enforce data types** in your code, which catches **type-related errors** at **compile time**, **preventing common runtime errors** and making the codebase more **robust**. <br/><br/>**Deno**<br/><br/>Unlike **NodeJS**, **Deno is secure by default**, requiring **explicit permissions** to access the **file system**, **network,** and **environment variables**, significantly **reducing the risk** of **unauthorized access**.<br> Unlike NodeJS Deno has **out-of-the-box TypeScript support**, **eliminating the need for configuration** files and additional setup, allowing developers to start using TypeScript immediately.                                                                                                                                                                                                                                                                         |
| Frontend & Backend Framework   | **Fresh**                          | A modern, server-side rendered web framework, designed to offer a fast, efficient, and straightforward way to build web applications with minimal configuration.                                                                                                                                                                                                                                                                                                   | <u>**Islands Architecture**</u><br/>**Description:** <br/>You can **choose what parts of the application are rendered on the server or client**, or serve just static HTML. **Server-side JavaScript** can handle the rendering.<br/><br/>**Justification:** <br/>This approach **enhances client performance** by **offloading** processing to the **server**, assuming adequate server resources.<br/><br/><u>**Minimal Configuration**</u><br/><br/>**Description:** <br/>Page routes are auto-mapped by the file structure. For example, a `/api/my_query.tsx` file creates a `/api/my_query` route.<br/><br/>**Justification:** <br/>This **simplifies development** by **eliminating the need for manual route configuration**, making the application easier and faster to develop.<br/><br/>By focusing on these points, you emphasize the performance benefits of Islands Architecture and the development efficiency of Minimal Configuration. |
| Styling Framework              | **Tailwind**                       | Tailwind CSS is a utility-first CSS framework that provides low-level, reusable utility classes to build custom designs directly in your HTML via the class names.                                                                                                                                                                                                                                                                                                 | We used Tailwind because it allows complete customization of HTML styling directly within the markup using utility classes, eliminating the need to write extensive custom CSS and speeding up the development process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Data Cleaning                  | **Python** & **Javascript (Deno)** | Python is a high level programming language, suitable for data science tasks like data cleaning. We used pandas, a data manipulation library when we cleaned data in the Roles table and other tables in the spreadsheet data which had orphaned ID's (that is to say Foraign keys which do not match up with a existing ID in the table its referencing). We used a JavaScript(Deno) script to migrate data from Mysql to MongoDB due to its native JSON support. | <br/>We chose Python for the data cleaning and Deno for the database migration based on their respective strengths:<br/><br/>**Python for Data Cleaning:** <br/>Python is a high-level programming language well-suited for data science tasks. We used the pandas library to clean the data in the Roles table and other spreadsheet tables with orphaned IDs (foreign keys not matching existing IDs in referenced tables). Python's robust data manipulation capabilities made it ideal for this task.<br/><br/>**Deno for Data Migration:**<br/>We used a JavaScript (Deno) script to migrate data from MySQL to MongoDB. Deno's native JSON support simplifies handling and transferring JSON data between databases, making it an excellent choice for this migration task.                                                                                                                                                                        |

---

**Duration:** ***<u>4 minutes</u>***

---

## Demo

### Speaker: Ryan

Demonstrate each query and what they do, explain that some queries only contain 1 entry due to lack of data, but when the company adds more records this will be more useful.

---

**Duration:** ***<u>1-2 minutes</u>***

---

## Conclusion

### Speaker: Jose

Thats it, Now we have to draw this video to a close,

There are many things we cound not cover due to time constraints, like methadology for **data cleaning** and **database migration to mongodb**.

Thanks for watching.

---

**Duration:** ***<u>less than 1 minute</u>***

---
