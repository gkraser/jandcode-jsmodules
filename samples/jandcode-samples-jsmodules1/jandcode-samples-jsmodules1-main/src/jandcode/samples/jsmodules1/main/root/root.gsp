<%@ page import="jandcode.core.apx.web.gsp.*; jandcode.commons.*; jandcode.core.*; jandcode.core.web.*; jandcode.core.web.gsp.*;jandcode.core.web.std.gsp.*;" %>
<!doctype html>
<%
  /*
    Запуск entry main из сгенерированного webpack приложения
   */

  BaseGsp th = this
  //
  def ctx = th.inst(JsIndexGspContext)
  def wpCtx = th.inst(WebpackIndexGspContext)
  //
  ctx.title = "Jandcode Samples Jsmodules1"

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
<% ctx.outLinks() %>
<script>
    ${wpCtx.libraryName}.run()
</script>
</body>
</html>