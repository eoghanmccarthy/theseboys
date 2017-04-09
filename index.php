<!DOCTYPE html>
<html lang="en">

	<head>
		<title>theseboys</title>
		<?php include 'partials/meta.php';?>
		<?php include 'partials/scripts.php';?>
	</head>

	<body>
		<div class="container-fluid">
			<!-- Header -->
			<?php include 'partials/header.php';?>
			<!-- Main -->
			<main>
				<div id="app"></div>
				<script type="text/jsx">
					let Player = React.createClass({
						render: function() { return (
							<h2>hey</h2>
						)}
					});
					ReactDOM.render(
						<Player />,
						document.getElementById('app')
					);
				</script>
			</main>
			<!-- Footer -->
			<?php include 'partials/footer.php';?>
		</div>
		<?php include 'partials/scripts-js.php';?>
	</body>

</html>
