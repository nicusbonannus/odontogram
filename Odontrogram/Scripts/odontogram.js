var odontogramBox;
function Odontogram(layerId, teeths) {
    this.LayerId = layerId,
    this.TeethSection = { "U": 0, "R": 1, "B": 2, "L": 3, "C": 4 },
    this.OdontrogramSections = [1,2,3,4],
    this.Layer = null,
    this.Teeths = teeths,
    this.Initialize = function () {
        this.Layer = $("#" + layerId);
        var that = this;
        $.each(this.OdontrogramSections, function (index, section) {
            var divContainer = $("<div>", { id: "Section"+index, class: "section" });
            
            $.each(that.Teeths, function (teethNumber, teethCode) {
                //Teeth Number
                var spanTeethNumber = $("<span>", {});
                spanTeethNumber.html(teethNumber);

                var teethContainer = $("<div>", { class: "teethContainer" });
                var teethDiv = $("<div>", { id: teethNumber, class: "teeth" });
                var teethPartLeft = $("<div>", { id: "L", class: "teethLeft" });
                var teethPartRight = $("<div>", { id: "R", class: "teethRight" });
                var teethPartCenter = $("<div>", { id: "C", class: "teethCenter" });
                var teethPartBottom = $("<div>", { id: "B", class: "teethBottom" });
                var teethPartUpper = $("<div>", { id: "U", class: "teethUpper" });

                teethDiv.append(teethPartUpper);
                teethDiv.append($("<div>", { class: "clear" }));
                teethDiv.append(teethPartLeft);
                teethDiv.append(teethPartCenter);
                teethDiv.append(teethPartRight);
                teethDiv.append($("<div>", { class: "clear" }));
                teethDiv.append(teethPartBottom);


                teethDiv.css('background-image', 'url(../Content/Images/' + teethCode + '.png)');
                if (section == 1 || section == 2)
                    teethContainer.append(spanTeethNumber);

                teethContainer.append(teethDiv);

                if (section == 3 || section == 4)
                    teethContainer.append(spanTeethNumber);


                divContainer.append(teethContainer);
            });
            that.Layer.append(divContainer);
        });

    }

    this.SetOperation = function (action, section, teethNumber) {
        this.Teeths[teethNumber] = this.GetCode(action,section,teethNumber);
        $("#" + teethNumber).css('background-image', 'url(../Content/Images/' + this.Teeths[teethNumber] + '.png)');
    },

    this.GetCode = function (action, section, teethNumber) {
        var teethCode = this.Teeths[teethNumber];
        if (action == 'prequired') {
            return this.ReplaceLetter(this.TeethSection[section], "C", teethCode);
        } else if(action == 'pdone') {
            return this.ReplaceLetter(this.TeethSection[section], "B", teethCode);
        }

        return 'AAAAA';
    },
    this.ReplaceLetter = function (index, character,code) {
        return code.substr(0, index) + character + code.substr(index + character.length);
    }
}

$(document).ready(function () {
    var teeths = {
        11: "AAAAA", 12: "ACCAA", 13: "ACCCA", 14: "AAAAA", 15: "AAAAA", 16: "CCCCC", 17: "ACACA", 18: "CCACC",
        21: "AAAAA", 22: "ACCAA", 23: "ACCCA", 24: "AAAAA", 25: "AAAAA", 26: "CCCCC", 27: "ACACA", 28: "CCACC"
    };

    odontogramBox = new Odontogram("odontogram",teeths);
    odontogramBox.Initialize();

    //Show menu when a list item is clicked
    $("#odontogram .teeth div").contextMenu({
        menu: 'myMenu'
    }, function (action, el, pos) {
        odontogramBox.SetOperation(action, el.attr("id"), el.parent().attr("id"));

    });
});