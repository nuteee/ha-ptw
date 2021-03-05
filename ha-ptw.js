// ==UserScript==
// @name         hasznaltauto power-to-weight ratio calculator
// @namespace    https://github.com/nuteee/ha-ptw
// @version      0.2
// @description  Calculates the power-to-weight ration for the currently visible car
// @author       Gergo Balkus
// @match        https://www.hasznaltauto.hu/szemelyauto/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rows = document.querySelector('.hirdetesadatok').rows;
    let horsePower = 0, powerIndex = 0, weight = 0;

    for(let i = 0; i < rows.length; i++) {
        if(getKeyText(rows[i]).includes('Saját tömeg')) {
            weight = getWeight(getValueText(rows[i]));
        }
        if(getKeyText(rows[i]).includes('Teljesítmény')) {
            powerIndex = i;
            horsePower = getWeight(getValueText(rows[i]));
            console.log(rows[i]);
        }
    }

    console.log(horsePower);
    console.log(weight);
    let ratio = (horsePower / weight) * 100

    //console.log(rows[powerIndex].cells);
    //rows[powerIndex].cells[1].innerText = rows[powerIndex].cells[1].innerText + ', (' + ratio.toFixed(2) + ')'
    if(!isNaN(ratio)) {
    	rows[powerIndex].cells[1].innerHTML = rows[powerIndex].cells[1].innerHTML.replace('</strong>', '') + ', (' + ratio.toFixed(2) + ' PtW)</strong>';
	}
	
    function getKeyText(tr) {
        return tr.cells[0].innerText;
    }

    function getValueText(tr) {
        return tr.cells[1].innerText;
    }

    function getWeight(weightString) {
        return parseInt(weightString.replace(/\s/g, '').replace('kg', ''));
    }

    function getHorsePower(hpstring) {
        return parseInt(hpstring.split(",")[1]);
    }
})();
