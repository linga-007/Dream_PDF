// import 'dart:html';
// import 'dart:typed_data';

// import 'package:dio/dio.dart';
// import 'package:dotted_border/dotted_border.dart';
// import 'package:file_picker/file_picker.dart';
// import 'package:flutter/foundation.dart' show kIsWeb;
// import 'package:flutter/material.dart';
// import 'package:http/http.dart';
import 'package:dotted_border/dotted_border.dart';
// import 'package:project/components/file.dart';
import 'dart:typed_data';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:dio/dio.dart';
import 'package:lottie/lottie.dart';
import 'package:project/components/file.dart';
import 'dart:io' if (kIsWeb) 'dart:html' as html;

import 'package:project/pages/pdf.dart';

class UploadPage extends StatefulWidget {
  const UploadPage({super.key});

  @override
  State<UploadPage> createState() => _HomePageState();
}

class _HomePageState extends State<UploadPage> {

  PlatformFile? _selectedFile;
  Uint8List? _fileBytes;
  String? _fileName;

  bool _isUploaded = false;
  String _content = "";
  bool upload = false;

  Future<void> _pickFile() async {
    if (kIsWeb) {
      // Web file picker
      final result = await FilePicker.platform.pickFiles(withData: true);
      if (result != null) {
        setState(() {
          _selectedFile = result.files.first;
          _fileBytes = result.files.first.bytes;
          _fileName = result.files.first.name;
        });
      }
    } else {
      // Mobile file picker
      final result = await FilePicker.platform.pickFiles();
      if (result != null) {
        setState(() {
          _selectedFile = result.files.single;
        });
      }
    }
  }

  Future<void> _uploadFile() async {
    if (_selectedFile == null && _fileBytes == null) return;

    String uploadUrl = "http://127.0.0.1:5000/upload";

    try {
      Dio dio = Dio();
      // late String _content;
      if (kIsWeb) {
        FormData formData = FormData.fromMap({
          'file': MultipartFile.fromBytes(_fileBytes!, filename: _fileName),
        });
        var response = await dio.post(uploadUrl, data: formData);
        setState(() {
          _content = response.data["file"];
        });

        if (response.statusCode == 200) {
          setState(() {
            _isUploaded = true;
          });
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('File uploaded successfully')));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('File upload failed')));
        }
      } else {
        FormData formData = FormData.fromMap({
          'file': await MultipartFile.fromFile(_selectedFile!.path!),
        });
        var response = await dio.post(uploadUrl, data: formData);
        setState(() {
          _content = response.data["file"];
        });

        if (response.statusCode == 200) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('File uploaded successfully')));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('File upload failed')));
        }
      }
    } catch (e) {

      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('File upload failed: $e')));
    }
  }

    void confirmUpload(){
    showDialog(
      context: context,
      builder: (context)=>AlertDialog(
        content: Text("No file has been  upload please upload a file"),
        actions: [
          MaterialButton(
            onPressed: ()=>Navigator.pop(context),
            child: Text("Ok"),
          ),
        ],
      )
    );
  }

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
      // drawer: Drawer(),
      body: SingleChildScrollView(
        child: (_content != "") ? Padding(
          padding: const EdgeInsets.all(15),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "File Content",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold
                ),
              ),
              SizedBox(height: 10,),
              Text(_content),
            ],
          ),
        ) : (upload == false) ? Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(top: 20,left: 20,right: 20,bottom: 10),
              child: DottedBorder(
                color: Color(0xff485551),
                strokeWidth: 1,
                borderType: BorderType.RRect,
                radius: Radius.circular(20),
                dashPattern: [10,5],
                child: GestureDetector(
                  onTap: _pickFile,
                  child: Container(
                    height: 400,
                    width: 500,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20)
                    ),
                    child: (_selectedFile != null || _fileBytes != null) ? 
                    Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Icon(Icons.picture_as_pdf, size: 50, color: Color(0xff485551),),
                          Text(
                            'Selected File: ${_selectedFile?.name ?? _fileName}',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold
                            ),
                          ),
                        ],
                      )
                    ) : 
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(Icons.upload, size: 50, color: Color(0xff485551),),
                        Text(
                          "Upload Your Pdf Here...",
                          style: TextStyle(
                            color: Color(0xff485551),
                            fontSize: 15,
                            fontWeight: FontWeight.bold
                          ),
                        ),
                      ],
                    )
                  ),
                ),
              ),
            ),
            SizedBox(height: 10,),
            Padding(
              padding: const EdgeInsets.only(left: 8),
              child: Text(
                "Recently Added Files",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold
                ),
              ),
            ),
            SizedBox(height: 10,),
            // (_content != "") ? Center(child: Text(_content)) : Center(child: Text("Content will be loaded here..."))
            File(name: "doc.pdf",),
            File(name: "ashif.pdf",),
            File(name: "linga.pdf"),
          ],
        ) : Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                height: 150,
              ),
              Container(
                child: Lottie.asset("assets/loading.json")
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Color(0xff485551),
        onPressed: (){
          if(_isUploaded){
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => Pdf(
                  text: _content,
                ),
              ),
            );
          }
          else{
            if(_selectedFile != null || _fileBytes != null){
              _uploadFile();
              setState(() {
                upload = true;
              });
            }
            else{
              confirmUpload();
            }
          }
        },
        child: Icon(_isUploaded ? Icons.navigate_next : Icons.upload, color: Colors.white,),
      ),
    );
  }
}