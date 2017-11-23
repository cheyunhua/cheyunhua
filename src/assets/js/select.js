export default function selectcontent() {
	var that = this;
	$(".areaselect").on("click", function() {
			var provinceValue = $(this).html();
			$("#areas1 .fpi-input-province").html(provinceValue);
			$("#areas1 .fpi-input-province").val(provinceValue);
			$("#areas2 .fpi-input-city").html(provinceValue);
			$("#areas2 .fpi-input-city").val(provinceValue);
			that.areaVisible = false;
	})
	}