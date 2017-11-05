import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = (title) =>
`<!doctype html>
<html>
	<head>
		<title>${title}</title>
		<link rel="stylesheet" href="${STATIC_PATH}/semantic.min.css" />
	</head>
	<body>
		<div class="${APP_CONTAINER_CLASS}"></div>
		<script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>

		<!--Start of Tawk.to Script-->
		<script type="text/javascript">
		if (window.location.host.indexOf("rutvij.in") === '-1') {
			return;
		}
		var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
		var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
		s1.async=true;
		s1.src='https://embed.tawk.to/59fed321198bd56b8c039539/default';
		s1.charset='UTF-8';
		s1.setAttribute('crossorigin','*');
		s0.parentNode.insertBefore(s1,s0);
		})();
		</script>
		<!--End of Tawk.to Script-->

	</body>
</html>
`

export default renderApp;
