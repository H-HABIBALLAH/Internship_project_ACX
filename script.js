window.onload = () => {
  //<-----------------------The title------------------------------>//
  var rowNum = 0;
  var prochaineRow = Array();
  var serviceMG = Array();

  if ($(".semaineBtn").length > 0) addInputWeek();
  if ($(".pencil").length > 0) addModifyWeek();
  if ($(".containsRow").length > 0) {
    rowNum =
      parseInt(
        document
          .querySelector("#myTableBody")
          .lastElementChild.getAttribute("id")
      ) + 1;
  }

  function addInputWeek() {
    $(".semaineBtn").on("click", () => {
      var weekValue = $("#semaineInput").val();
      var week = `<span class="weekNumber">${weekValue}</span>`;
      $("head title").html($("head title").html() + ` ${weekValue}`);
      $(".semaineBtn").remove();
      $("#semaineInput").remove();
      $("#title").append(week);
      $("#title").append('<div id="modifyPencil" class="pencil">🖉</div>');
      addModifyWeek();
    });
  }

  function addModifyWeek() {
    $(".pencil").on("click", () => {
      var btn = `<button class="btn btn-secondary semaineBtn">OK</button>`;
      var input = `<input type="text" id="semaineInput" style="width: 60px">`;
      $(".pencil").remove();
      $(".weekNumber").remove();
      $("#title").append(input);
      $("#title").append(btn);
      addInputWeek();
    });
  }

  //<-----------------------input row---------------------------->//

  addInputRow();

  function addInputRow() {
    var addOrModifyRow = `<div id="addOrModifyRow">
    <button id="addButton">
        <span id="plus">+</span>
    </button>
    <button id="modifyButton">
        <span id="modify">🖉</span>
    </button>
</div>`;
    if ($("#addOrModifyRow").length == 0) $("#clé").before(addOrModifyRow);
    if (!$("#myTableBody").hasClass("containsRow")) {
      $("#modifyButton").remove();
    }
    $("#addButton").on("click", () => {
      console.log(rowNum);
      var inputRow = `<tr id="inputRow-${rowNum}" class="form-group input-row">
      <td class="DI" id="inputCol">
      <input name="DI" type="text" class="form-control">
      </td>
      <td class="Date-de-lancement-DI" id="inputCol">
      <input type="Date" class="form-control" name="Date de lancement DI">
      </td>
      <td class="Code-Service-Demandeur" id="inputCol">
      <input type="text" class="form-control" name="Code Service Demandeur">
      <select class="mySelect mt-2">
      <option>--</option>
      <option>MG</option>
      <option>Extraction</option>
      <option>Beneficiation</option>
      <option>Pipeline et down stream</option>
      <option>Safi</option>
      <option>Jorf</option>
      <option>Benguerir</option>
      </select>
      </td>
      <td class="OT" id="inputCol">
      <input type="text" class="form-control" name="OT">
      </td>
      <td class="Date-de-lancement-OT" id="inputCol">
      <input type="Date" class="form-control" name="Date de lancement OT">
      </td>
      <td class="Description-de-travail" id="inputCol">
      <input type="text" class="form-control" name="Description de travail">
      </td>
      <td class="Nature-de-travail" id="inputCol">
      <select>
      <option>Normale</option>
      <option>URGENT</option>
      </select>
      </td>
      <td class="Statut-de-travail" id="inputCol">
      <select>
      <option>En cours</option>
      <option>Terminé</option>
      </select>
      </td>
      <td class="Date-de-fin-des-travaux" id="inputCol">
      <input type="Date" class="form-control" name="Date de fin des travaux" style="width : 100%">
      </td>
      <td class="Sections-intervenantes" id="inputCol">
      <input type="text" class="form-control" name="Sections intervenantes">
      </td>
      </tr>`;
      $("#myTable").append(inputRow);
      $("#addOrModifyRow").remove();
      //problem
      var validateOrCancelRow = `<div id="validateOrCancelRow">
      <button id="validateButton">
          <span id="validate">✓</span>
      </button>
      <button id="cancelButton">
          <span id="cancel">✗</span>
      </button>
  </div>`;
      $("#clé").before(validateOrCancelRow);
      $(`.semaineProchaine-${rowNum}`).on("click", () => {
        if (
          $(`.semaineProchaine-${rowNum}`).html() ==
          "Travail pour la semaine n+1"
        ) {
          prochaineRow[rowNum] = 1;
          console.log(prochaineRow[rowNum]);
          $(`.semaineProchaine-${rowNum}`).html("Travail pour cette semaine");
        } else {
          prochaineRow[rowNum] = 0;
          console.log(prochaineRow[rowNum]);
          $(`.semaineProchaine-${rowNum}`).html("Travail pour la semaine n+1");
        }
      });
      validateOrCancel();
    });
    $("#modifyButton").on("click", () => {
      $("#myTable").addClass("table-hover");
      for (let i = 0; i < rowNum; i++) {
        $(".rowValue-" + i).on("click", () => {
          $("#myTable").removeClass("table-hover");
          $(".rowValue-" + i).attr("style", "display:none");
          var okOrCancelRow = `
          <tr class="okOrCancelRow" >
          <td  style = "border:none;"></td>
          <td style = "border:none;"></td>
          <td style = "border:none;"></td>
          <td style = "border:none;"></td>
          <td style = "border:none;"></td>
          <td style = "border:none;text-align:inherit">
          <button id="OkButton" class="btn btn-primary" style="margin : 10px 20px 10px 0px;">
          Enregistrer
          </button>
          <button id="annulerButton" class="btn btn-danger">
          Annuler
          </button>
          </td>
          </tr>`;
          var inputRow = `<tr id="inputRow-${i}" class="form-group input-row">
          <td class="DI" id="inputCol">
          <input name="DI" type="text" class="form-control">
          </td>
          <td class="Date-de-lancement-DI" id="inputCol">
          <input type="Date" class="form-control" name="Date de lancement DI">
          </td>
          <td class="Code-Service-Demandeur" id="inputCol">
          <input type="text" class="form-control" name="Code Service Demandeur">
          <select class="mySelect mt-2">
          <option>--</option>
          <option>MG</option>
          <option>Extraction</option>
          <option>Beneficiation</option>
          <option>Pipeline et down stream</option>
          <option>Safi</option>
          <option>Jorf</option>
          <option>Benguerir</option>
          </select>
          </td>
          <td class="OT" id="inputCol">
          <input type="text" class="form-control" name="OT">
          </td>
          <td class="Date-de-lancement-OT" id="inputCol">
          <input type="Date" class="form-control" name="Date de lancement OT">
          </td>
          <td class="Description-de-travail" id="inputCol">
          <input type="text" class="form-control" name="Description de travail">
          </td>
          <td class="Nature-de-travail" id="inputCol">
          <select>
          <option>Normale</option>
          <option>URGENT</option>
          </select>
          </td>
          <td class="Statut-de-travail" id="inputCol">
          <select>
          <option>En cours</option>
          <option>Terminé</option>
          </select>
          </td>
          <td class="Date-de-fin-des-travaux" id="inputCol">
          <input type="Date" class="form-control" name="Date de fin des travaux">
          <button class="semaineProchaine semaineProchaine-${i}"></button>
          </td>
          <td class="Sections-intervenantes" id="inputCol">
          <input type="text" class="form-control" name="Sections intervenantes">
          </td>
          </tr>`;
          $(".rowValue-" + i).after(okOrCancelRow);
          $(".rowValue-" + i).after(inputRow);
          if (prochaineRow[i])
            $(".semaineProchaine").html("Travail pour cette semaine");
          else $(".semaineProchaine").html("Travail pour la semaine n+1");
          if (serviceMG[i]) $(".serviceMG").html("Service non MG");
          else $(".serviceMG").html("Service MG");
          var rowValues = document.querySelector(".rowValue-" + i).children;
          var inputValues = document.querySelector("#inputRow-" + i).children;
          for (let j = 0; j < 10; j++) {
            inputValues[j].firstElementChild.value = rowValues[j].innerHTML;
          }
          $(`.semaineProchaine-${i}`).on("click", () => {
            if (
              $(`.semaineProchaine-${i}`).html() ==
              "Travail pour la semaine n+1"
            ) {
              prochaineRow[i] = 1;
              console.log(prochaineRow[i]);
              $(`.semaineProchaine-${i}`).html("Travail pour cette semaine");
            } else {
              prochaineRow[i] = 0;
              console.log(prochaineRow[i]);
              $(`.semaineProchaine-${i}`).html("Travail pour la semaine n+1");
            }
          });

          $("#annulerButton").on("click", () => {
            $("#inputRow-" + i).remove();
            $(".rowValue-" + i).removeAttr("style");
            $(".okOrCancelRow").remove();
            for (let l = 0; l < rowNum; l++) $(".rowValue-" + l).off("click");
            addInputRow();
          });
          $("#OkButton").on("click", () => {
            for (let j = 0; j < 10; j++) {
              rowValues[j].innerHTML = inputValues[j].firstElementChild.value;
            }
            if ($(`.Nature-de-travail-${i}`).text() == "URGENT")
              $(`.Nature-de-travail-${i}`).attr(
                "style",
                "background-color : #ff5733"
              );
            else {
              $(`.Nature-de-travail-${i}`).attr(
                "style",
                "background-color : none"
              );
            }

            if ($(`.Statut-de-travail-${i}`).text() == "Terminé")
              $(`.Statut-de-travail-${i}`).attr(
                "style",
                "background-color : #91d18b"
              );
            else {
              $(`.Statut-de-travail-${i}`).attr(
                "style",
                "background-color : none"
              );
            }
            if (prochaineRow[i]) {
              $(`.rowValue-${i} .Date-de-fin-des-travaux-${i}`).addClass(
                "semaineClicked"
              );
              $(`.rowValue-${i} .Date-de-fin-des-travaux-${i}`).removeClass(
                "semaineUnclicked"
              );
            } else {
              $(`.rowValue-${i} .Date-de-fin-des-travaux-${i}`).addClass(
                "semaineUnclicked"
              );
              $(`.rowValue-${i} .Date-de-fin-des-travaux-${i}`).removeClass(
                "semaineClicked"
              );
            }
            if (
              $(`#inputRow-${i} .Code-Service-Demandeur .mySelect`).val() == "MG"
            )
              $(`.Code-Service-Demandeur-${i}`).attr(
                "style",
                "background-color : #ffc93c"
              );
            if (
              $(`#inputRow-${i} .Code-Service-Demandeur .mySelect`).val() ==
              "Extraction"
            )
              $(`.Code-Service-Demandeur-${i}`).attr(
                "style",
                "background-color : #e5df88"
              );
            if (
              $(`#inputRow-${i} .Code-Service-Demandeur .mySelect`).val() ==
              "Beneficiation"
            )
              $(`.Code-Service-Demandeur-${i}`).attr(
                "style",
                "background-color :#a6dcef"
              );
            if (
              $(`#inputRow-${i} .Code-Service-Demandeur .mySelect`).val() ==
              "Pipeline et down stream"
            )
              $(`.Code-Service-Demandeur-${i}`).attr(
                "style",
                "background-color : #dcd6f7"
              );
            if (
              $(`#inputRow-${i} .Code-Service-Demandeur .mySelect`).val() ==
              "Safi"
            )
              $(`.Code-Service-Demandeur-${i}`).attr(
                "style",
                "background-color : #bfdcae"
              );
            if (
              $(`#inputRow-${i} .Code-Service-Demandeur .mySelect`).val() ==
              "Jorf"
            )
              $(`.Code-Service-Demandeur-${i}`).attr(
                "style",
                "background-color : #e8ded2"
              );
            if (
              $(`#inputRow-${i} .Code-Service-Demandeur .mySelect`).val() ==
              "Benguerir"
            )
              $(`.Code-Service-Demandeur-${i}`).attr(
                "style",
                "background-color : #ff9a76"
              );
            $("#inputRow-" + i).remove();
            $(".rowValue-" + i).removeAttr("style");
            $(".okOrCancelRow").remove();
            for (let l = 0; l < rowNum; l++) $(".rowValue-" + l).off("click");
            addInputRow();
          });
        });
      }
      $("#addOrModifyRow").remove();
    });
  }

  function validateOrCancel() {
    var rowValueElement = `<tr class="tableRow rowValue-${rowNum}" id="${rowNum}">
    <td class="DI DI-${rowNum}"></td>
    <td class="Date-de-lancement-DI-${rowNum}"></td>
    <td class="Code-Service-Demandeur Code-Service-Demandeur-${rowNum}"></td>
    <div class="service"-${rowNum}" style="display : none"></div>
    <td class="OT-${rowNum}"></td>
    <td class="Date-de-lancement-OT-${rowNum}"></td>
    <td class="Description-de-travail-${rowNum}"></td>
    <td class="Nature-de-travail-${rowNum}"></td>
    <td class="Statut-de-travail-${rowNum}"></td>
    <td class="Date-de-fin-des-travaux-${rowNum}"></td>
    <td class="Sections-intervenantes-${rowNum}"></td>
        </tr>
        `;
    $("#validateButton").on("click", () => {
      $("#clé").removeClass("d-none");
      $("#myTableBody").addClass("containsRow");
      $("#myTable #myTableBody").append(rowValueElement);
      if (prochaineRow[rowNum]) {
        $(`.rowValue-${rowNum} .Date-de-fin-des-travaux-${rowNum}`).addClass(
          "semaineClicked"
        );
        $(`.rowValue-${rowNum} .Date-de-fin-des-travaux-${rowNum}`).removeClass(
          "semaineUnclicked"
        );
      } else {
        $(`.rowValue-${rowNum} .Date-de-fin-des-travaux-${rowNum}`).addClass(
          "semaineUnclicked"
        );
        $(`.rowValue-${rowNum} .Date-de-fin-des-travaux-${rowNum}`).removeClass(
          "semaineClicked"
        );
      }
      if (serviceMG[rowNum]) {
        $(`.rowValue-${rowNum} .Code-Service-Demandeur-${rowNum}`).addClass(
          "serviceMGClicked"
        );
        $(`.rowValue-${rowNum} .Code-Service-Demandeur-${rowNum}`).removeClass(
          "serviceMGUnclicked"
        );
      } else {
        $(`.rowValue-${rowNum} .Code-Service-Demandeur-${rowNum}`).addClass(
          "serviceMGUnclicked"
        );
        $(`.rowValue-${rowNum} .Code-Service-Demandeur-${rowNum}`).removeClass(
          "serviceMGClicked"
        );
      }
      var rowValues = document.querySelector(".rowValue-" + rowNum).children;
      var inputValues = document.querySelector("#inputRow-" + rowNum).children;
      for (let j = 0; j < 10; j++) {
        rowValues[j].innerHTML = inputValues[j].firstElementChild.value;
      }

      if ($(`.Nature-de-travail-${rowNum}`).text() == "URGENT")
        $(`.Nature-de-travail-${rowNum}`).attr(
          "style",
          "background-color : #ff5733"
        );

      if ($(`.Statut-de-travail-${rowNum}`).text() == "Terminé")
        $(`.Statut-de-travail-${rowNum}`).attr(
          "style",
          "background-color : #91d18b"
        );

      if (
        $(`#inputRow-${rowNum} .Code-Service-Demandeur .mySelect`).val() == "MG"
      )
        $(`.Code-Service-Demandeur-${rowNum}`).attr(
          "style",
          "background-color : #ffc93c"
        );
      if (
        $(`#inputRow-${rowNum} .Code-Service-Demandeur .mySelect`).val() ==
        "Extraction"
      )
        $(`.Code-Service-Demandeur-${rowNum}`).attr(
          "style",
          "background-color : #e5df88"
        );
      if (
        $(`#inputRow-${rowNum} .Code-Service-Demandeur .mySelect`).val() ==
        "Beneficiation"
      )
        $(`.Code-Service-Demandeur-${rowNum}`).attr(
          "style",
          "background-color :#a6dcef"
        );
      if (
        $(`#inputRow-${rowNum} .Code-Service-Demandeur .mySelect`).val() ==
        "Pipeline et down stream"
      )
        $(`.Code-Service-Demandeur-${rowNum}`).attr(
          "style",
          "background-color : #dcd6f7"
        );
      if (
        $(`#inputRow-${rowNum} .Code-Service-Demandeur .mySelect`).val() ==
        "Safi"
      )
        $(`.Code-Service-Demandeur-${rowNum}`).attr(
          "style",
          "background-color : #bfdcae"
        );
      if (
        $(`#inputRow-${rowNum} .Code-Service-Demandeur .mySelect`).val() ==
        "Jorf"
      )
        $(`.Code-Service-Demandeur-${rowNum}`).attr(
          "style",
          "background-color : #e8ded2"
        );
      if (
        $(`#inputRow-${rowNum} .Code-Service-Demandeur .mySelect`).val() ==
        "Benguerir"
      )
        $(`.Code-Service-Demandeur-${rowNum}`).attr(
          "style",
          "background-color : #ff9a76"
        );

      $("#inputRow-" + rowNum).remove();
      $("#validateOrCancelRow").remove();
      rowNum++;
      addInputRow();
    });
    $("#cancelButton").on("click", () => {
      $("#inputRow-" + rowNum).remove();
      console.log(rowNum);
      $("#validateOrCancelRow").remove();
      addInputRow();
    });
  }
};
