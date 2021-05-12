document
	.getElementById("disabled")
	.addEventListener("submit", (e) => e.preventDefault());

document
	.getElementById("back")
	.addEventListener("click", (e) => history.back());
