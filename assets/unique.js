$(document).ready(function(){
  $(document).on('click',".t4s-btn-coupon",function(){
    let text = $(this).data("coupon");
    navigator.clipboard.writeText(text);
    $(this).find(".tooltiptext").text( T4Sstrings.copied_tooltipText + ": " + text);

  })
  $(document).on('mouseleave',".t4s-btn-coupon",function(){
    $(this).find(".tooltiptext").text(T4Sstrings.copy_tooltipText);
   
  })
})