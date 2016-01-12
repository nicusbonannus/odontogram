var odontogramBox;
function Odontogram(layerId) {
    this.LayerId = layerId,
    this.Layer = null,
    this.Initialize = function () {
        this.Layer = $("#" + layerId);
        var divContainer = $("<div>", { id: "1", class: "section" });
        for (i = 11; i <= 18; i++) {
            var teethDiv = $("<div>", { id: i, class: "teeth" });
            var teethPartLeft = $("<div>", {  class: "teethLeft" });
            var teethPartRight = $("<div>", {class: "teethRight" });
            var teethPartCenter = $("<div>", {class: "teethCenter" });
            var teethPartBottom = $("<div>", {class: "teethBottom" });
            var teethPartUpper = $("<div>", {class: "teethUpper" });

            $(teethPartUpper).mousedown(function (e) {
                if (e.button == 2) {

                }
            });
            teethDiv.append(teethPartUpper);
            teethDiv.append($("<div>", {class:"clear"}));
            teethDiv.append(teethPartLeft);
            teethDiv.append(teethPartCenter);
            teethDiv.append(teethPartRight);
            teethDiv.append($("<div>", { class: "clear" }));
            teethDiv.append(teethPartBottom);


            teethDiv.css('background-image', 'url(../Content/Images/AAAAA.png)');
            divContainer.append(teethDiv);
            

        }

        this.Layer.append(divContainer);

    }
}

$(document).ready(function () {
    odontogramBox = new Odontogram("odontogram");
    odontogramBox.Initialize();

    // Show menu when a list item is clicked
    $("#odontogram .teeth div").contextMenu({
        menu: 'myMenu'
    }, function (action, el, pos) {
        alert(
            'Action: ' + action + '\n\n' +
            'Element ID: ' + el.parent().attr("id") + '\n\n'
            );
    });

    // Disable menus
    //$("#disableMenus").click(function () {
    //    $('#myDiv, #myList UL LI').disableContextMenu();
    //    $(this).attr('disabled', true);
    //    $("#enableMenus").attr('disabled', false);
    //});

    //// Enable menus
    //$("#enableMenus").click(function () {
    //    $('#myDiv, #myList UL LI').enableContextMenu();
    //    $(this).attr('disabled', true);
    //    $("#disableMenus").attr('disabled', false);
    //});

    //// Disable cut/copy
    //$("#disableItems").click(function () {
    //    $('#myMenu').disableContextMenuItems('#cut,#copy');
    //    $(this).attr('disabled', true);
    //    $("#enableItems").attr('disabled', false);
    //});

    //// Enable cut/copy
    //$("#enableItems").click(function () {
    //    $('#myMenu').enableContextMenuItems('#cut,#copy');
    //    $(this).attr('disabled', true);
    //    $("#disableItems").attr('disabled', false);
    //});
});