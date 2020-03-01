tinymce.init({
    selector: '.mytextarea',
    directionality :'rtl',
    height: 300,
    themes: 'silver',
    skine:'oxide-dark',
    mobile: {
        theme: 'mobile',
        plugins: [ 'autosave', 'lists', 'autolink' ],
        toolbar: [ 'undo', 'bold', 'italic', 'styleselect' ]
      },
      menubar: 'file edit insert view format insert table tools  help ',
      content_css:'css/content.css',

      toolbar: ' fullscreen undo redo searchreplace  |bold italic underline codesample|fontsizeselect formatselect  fontselect | ltr rtl alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image imagetools | print preview media | forecolor backcolor emoticons charmap toc code',
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'save table contextmenu directionality emoticons template paste textcolor',
        'imagetools codesample toc importcss legacyoutput help autosave'

      ],
      api_key: 'add-to-cart=197933',
     
      browser_spellcheck: true,

       /* enable title field in the Image dialog*/
   image_title: true,
   /* enable automatic uploads of images represented by blob or data URIs*/
   automatic_uploads: true,
   /*
     URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
     images_upload_url: 'postAcceptor.php',
     here we add custom filepicker only to Image dialog
   */
   file_picker_types: 'image',
   /* and here's our custom image picker*/
   file_picker_callback: function (cb, value, meta) {
     var input = document.createElement('input');
     input.setAttribute('type', 'file');
     input.setAttribute('accept', 'image/*');
 
     /*
       Note: In modern browsers input[type="file"] is functional without
       even adding it to the DOM, but that might not be the case in some older
       or quirky browsers like IE, so you might want to add it to the DOM
       just in case, and visually hide it. And do not forget do remove it
       once you do not need it anymore.
     */
 
     input.onchange = function () {
       var file = this.files[0];
 
       var reader = new FileReader();
       reader.onload = function () {
         /*
           Note: Now we need to register the blob in TinyMCEs image blob
           registry. In the next release this part hopefully won't be
           necessary, as we are looking to handle it internally.
         */
         var id = 'blobid' + (new Date()).getTime();
         var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
         var base64 = reader.result.split(',')[1];
         var blobInfo = blobCache.create(id, file, base64);
         blobCache.add(blobInfo);
 
         /* call the callback and populate the Title field with the file name */
         cb(blobInfo.blobUri(), { title: file.name });
       };
       reader.readAsDataURL(file);
     };
 
     input.click();
   },
   
  /* without images_upload_url set, Upload tab won't show up*/
  images_upload_url: 'postAcceptor.php',

  /* we override default upload handler to simulate successful upload*/
  images_upload_handler: function (blobInfo, success, failure) {
    setTimeout(function () {
      /* no matter what you upload, we will turn it into TinyMCE logo :)*/
      success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
    }, 2000);
  },

      
});