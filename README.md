# Image Processing-API

 An API project used for rescaling .jpg images using node.js with the sharp library

## Setup and Usage

### &nbsp;&nbsp;&nbsp;- Dependencies

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To install the dependencies required for running the API, in your terminal, use `npm install`

### &nbsp;&nbsp;&nbsp;- Running the server

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In order to run the server, type `{path to the root folder}/build/index.js`

### &nbsp;&nbsp;&nbsp;- Using the API

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you're running this locally, you can type in your browser on of the following links, while replacing `{name}`, `{width}` and `{height}` with the file name __*(without the extension)*__, width and height respectively:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.`localhost:8080/api/resize?name={name}&width={width}&height={height}`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.`localhost:8080/api/resize?name={name}&width={width}`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.`localhost:8080/api/resize?name={name}&height={height}`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Note**: This API only converts images with .jpg extensions (at least for now :D)