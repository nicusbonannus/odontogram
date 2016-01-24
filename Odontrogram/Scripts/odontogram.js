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
        $.each(this.Teeths, function (section, teehtsInSection) {
            var divContainer = $("<div>", { id: section, class: "section" });
            
            $.each(teehtsInSection, function (teethNumber, teethCode) {
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

    this.SetOperation = function (action, section, teethNumber,teethArea) {
        this.Teeths[teethArea][teethNumber] = this.GetCode(action,section,teethNumber,teethArea);
        $("#" + teethArea+" #" + teethNumber).css('background-image', 'url(../Content/Images/' + this.Teeths[teethArea][teethNumber] + '.png)');
    },

    this.GetCode = function (action, section, teethNumber, teethArea) {
        var teethCode = this.Teeths[teethArea][teethNumber];
        if (this.IsWholeTeethCode(teethCode)) {
            teethCode = 'AAAAA';
        }
        if (action == 'prequired') {
            return this.ReplaceLetter(this.TeethSection[section], "C", teethCode);
        } else if(action == 'pdone') {
            return this.ReplaceLetter(this.TeethSection[section], "B", teethCode);
        } else if (action == 'premovable') {
            return 'FFFFF';
        } else if (action == 'crown') {
            return 'GGGGG';
        }else if (action == 'pfixed') {
            return 'EEEEE';
        } else if (action == 'eRequired') {
            return 'HHHHH';
        } else if (action == 'tAusent') {
            return 'DDDDD';
        } else if (action == 'cSector') {
            return this.ReplaceLetter(this.TeethSection[section], "A", teethCode);
        } else {
            return 'AAAAA';
        }
    },

    this.IsWholeTeethCode = function (code) {
        return (code == 'GGGGG' || code == 'FFFFF' || code == 'HHHH' || code == 'DDDDD' );
    },
    this.ReplaceLetter = function (index, character,code) {
        return code.substr(0, index) + character + code.substr(index + character.length);
    },
    this.GetToothStatus = function(){
        return this.Teeths;
    }
}

$(document).ready(function () {
    var teeths = {
        'S1': { 1: "AAAAA", 2: "ACCAA", 3: "ACCCA", 4: "AAAAA", 5: "AAAAA", 6: "CCCCC", 7: "ACACA", 8: "CCACC" },
        'S2': { 1: "AAAAA", 2: "ACCAA", 3: "ACCCA", 4: "AAAAA", 5: "AAAAA", 6: "CCCCC", 7: "ACACA", 8: "CCACC" },
        'S3': { 1: "AAAAA", 2: "ACCAA", 3: "ACCCA", 4: "AAAAA", 5: "AAAAA", 6: "CCCCC", 7: "ACACA", 8: "CCACC" },
        'S4': { 1: "AAAAA", 2: "ACCAA", 3: "ACCCA", 4: "AAAAA", 5: "AAAAA", 6: "CCCCC", 7: "ACACA", 8: "CCACC" },
    };

    odontogramBox = new Odontogram("odontogram",teeths);
    odontogramBox.Initialize();

    //Show menu when a list item is clicked
    $("#odontogram .teeth div").contextMenu({
        menu: 'myMenu'
    }, function (action, el, pos) {
        odontogramBox.SetOperation(action, el.attr("id"), el.parent().attr("id"), el.parent().parent().parent().attr("id"));

    });
});