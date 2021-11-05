<%@ page import="jandcode.core.apx.web.gsp.*; jandcode.core.web.gsp.*;jandcode.core.web.std.gsp.*;" %>
<!doctype html>
<%
  /*
    Запуск entry main из сгенерированного webpack приложения
   */

  BaseGsp th = this
  //
  def ctx = th.inst(JsIndexGspContext)
  def wpCtx = th.inst(FrontendIndexGspContext)
  //
  ctx.title = "Jandcode Samples Jsmodules1"
  // добавляем в ссылки entry с именем 'main'
  wpCtx.addLink("main")
%>
<html>
<head>
  <meta charset="UTF-8">
  <title>${ctx.title}</title>
  <link rel="icon" href="data:,">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
<div id="jc-app"></div>
%{-- выводим все ссылки, которые были добавлены в addLink выше--}%
<% ctx.outLinks() %>
%{-- выводим запуск entry, фактически генерируется JcEntry.run() --}%
<script>
    ${wpCtx.libraryName}.run()
</script>
</body>
</html>