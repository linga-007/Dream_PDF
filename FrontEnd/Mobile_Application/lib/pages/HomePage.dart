import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:project/components/drawer.dart';
import 'package:project/components/file.dart';
import 'package:project/pages/UploadPage.dart';
import 'package:http/http.dart' as http;

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  // List files = ["doc.pdf", "ashif.pdf", "linga.pdf", "madhu.pdf", "kishore.pdf"];

  // @override
  // void initState() {
  //   super.initState();
  //   loadContent();
  // }

  // Future<List> loadContent() async{
  //   var response = await http.get(Uri.parse("http://localhost:5000/get_pdfs"));
  //   var decode = await jsonDecode(response.body);
  //   print(decode);
  //   List<Files> files = [];
  //   for(var i in decode["data"]){
  //     Files file = Files(pdf_content: i["pdf_content"],pdf_name: i["pdf_name"]);
  //     files.add(file);
  //   }
  //   return files;
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xfff1ffde),
      appBar: AppBar(
        backgroundColor: Color(0xff485551),
        foregroundColor: Colors.white,
        title: Text(
          "Pocket PDF",
          style: TextStyle(
            fontWeight: FontWeight.bold
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(left: 20),
            child: IconButton(
              icon: Icon(Icons.account_circle, size: 35,),
              onPressed: () {},
            ),
          ),
        ],
      ),
      drawer: DrawerComponent(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
            margin: EdgeInsets.only(top: 10,left: 10,right: 10,bottom: 10),
            child: TextField(
              decoration: InputDecoration(
                filled: true,
                fillColor: Color(0xffFCF8F3),
                contentPadding: const EdgeInsets.all(15),
                hintText: "Search",
                hintStyle: TextStyle(
                  color: Colors.black
                ),
                prefixIcon: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Icon(
                    Icons.search,
                    color: Colors.black,
                  ),
                ),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10))
              ),
            ),
          ),
          File(name: "doc.pdf",),
          File(name: "ashif.pdf",),
          File(name: "linga.pdf",),
          File(name: "madhu.pdf",),
          File(name: "kishore.pdf",),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Color(0xff485551),
        onPressed: (){
          Navigator.push(
            context, 
            MaterialPageRoute(
              builder: (context) => UploadPage(),
            ),
          );
        },
        child: Icon(Icons.add, color: Colors.white, ),
      ),
    );
  }
}

class Files {
  final String pdf_name;
  final String pdf_content;
  Files({required this.pdf_name, required this.pdf_content});
}