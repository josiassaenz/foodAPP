<?php
   
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $blob = $_POST['blob'];
    $name = $_POST['name'];
    $path = $_POST['path'];
       
    $folderPath = $path;
    $postdata = file_get_contents("php://input");
    $request = json_decode($blob);
       
    $image_parts = explode(";base64,", $request->fileSource);
       
    $image_type_aux = explode("image/", $image_parts[0]);
       
    $image_type = $image_type_aux[1];
       
    $image_base64 = base64_decode($image_parts[1]);
       
    $file = $folderPath . $name;
       
    file_put_contents($file, $image_base64);
   
?>