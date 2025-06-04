class homeController{
    mostrarHome(req, res) {
        console.log("HomeController - mostrarHome");
        res.render("index")
    }
}