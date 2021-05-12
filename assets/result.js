document
	.getElementById("shortner")
	.addEventListener("submit", (e) => e.preventDefault());

document.getElementById("copy").addEventListener("click", (e) => {
	document.getElementById("url").select();
	document.execCommand("copy");
	e.target.innerText = "Copied";
});

document
	.getElementById("back")
	.addEventListener("click", (e) => history.back());
