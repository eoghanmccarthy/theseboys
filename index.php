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
            <main>
                <section class="band band__gallery">
                    <div id="gallery" class="row">
                        <div class="col-md-6">
                            <figure class="media">
                                <img class="media__content" src="img/img_3564.jpg" onclick="topSlide(1)">
                            </figure>
                        </div>
                        <div class="col-md-6">
                            <figure class="media">
                                <img class="media__content" src="img/img_3568.jpg" onclick="topSlide(2)">
                            </figure>
                        </div>
                        <div class="col-md-6">
                            <figure class="media">
                                <img class="media__content" src="img/img_4006.jpg" onclick="topSlide(3)">
                            </figure>
                        </div>
                        <div class="col-md-6">
                            <figure class="media">
                                <img class="media__content" src="img/img_4013.jpg" onclick="topSlide(4)">
                            </figure>
                        </div>
                    </div>
                </section>
            </main>
            <!-- Footer -->
            <?php include 'partials/footer.php';?>
        </div>
        <?php include 'partials/scripts-js.php';?>
    </body>

</html>
