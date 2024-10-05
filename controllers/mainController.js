const controller = {}

controller.inicio = (req, res) => {
  const { user } = req.session
  res.render('main', user)
}

export { controller }