# auto-gitbook

## Description

可以自动抓取工程中所有用md文件生成文档的gitbook自动化工具。
Auto markdown convert gitbook

## Dependence
    gitbook-cli
```
    npm install gitbook-cli -g
```
## Install

``` 
npm install auto-gitbook -g
```

## Usage

### Create

``` 
    $ auto-gitbook documentation --create
    $ auto-gitbook d -c
```

### Local preview

``` 
    $ auto-gitbook documentation --server
    $ auto-gitbook d -s
```

## More
    
    1. 默认使用端口`4000`，使用`auto-gitbook d -s`成功后可以使用localhost:4000打开预览。
    2. 根目录需要有一个README.md文件来生成`introduction`。
    3. 文件目录中只要有md文件都会被抓取生成文档, 默认忽略`_doc`, `node_modules`, `隐藏文件夹`。
    4. 可以进入`./_doc/source/_book/gitbook`该目录配置`book.json`对gitbook进行配置。