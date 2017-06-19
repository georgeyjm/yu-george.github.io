var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var DIGITS = '0123456789';
var BASE_MAX = DIGITS + LETTERS;

function base_convert(num, fromBase, toBase) {
    if (!(fromBase >= 2 && fromBase <= 36 && toBase >= 2 && toBase <= 36 && num && isvalid(num, fromBase))) {
        return 'ERROR';
	}
    if (fromBase == toBase) {
        return num;
	}
    if (fromBase == 10) {
        return ten_to(parseInt(num), toBase);
	} else if (toBase == 10) {
        return to_ten(num, fromBase);
	} else {
        return ten_to(to_ten(num, fromBase), toBase);
	}
}

function isvalid(num, base) {
    var valid_digits = BASE_MAX.slice(0, base);
	for (var i = 0; i < valid_digits.length; i++) {
		if (!valid_digits.includes(num.charAt(i))) {
			return false;
		}
	}
	return true;
}

function convert(num) {
    num = num.toString().toUpperCase();
    if (num.length > 1) {
        return LETTERS.charAt(parseInt(num)-10);
	} else if (LETTERS.includes(num)) {
        return parseInt(LETTERS.indexOf(num)) + 10;
	} else {
        return parseInt(num);
	}
}

function to_ten(num, base) {
    var converted = 0;
	num = num.toString().split('').reverse().join('');
	for (var i = 0; i < num.length; i++) {
		converted += convert(num.charAt(i)) * base ** i;
	}
    return converted;
}

function ten_to(num, base) {
    var converted = '';
    while (num >= base) {
        var remainder = convert(num % base);
        converted = remainder.toString() + converted;
        num = (num - (num % base)) / base;
	}
    var remainder = convert(num % base);
    return remainder.toString() + converted;
}

window.onload = function() {
	$('#fromBase').keypress(function(){ if (this.value.length == 2) return false; });
	$('#toBase').keypress(function(){ if (this.value.length == 2) return false; });
	$('#num').keypress(function(){
		this.setAttribute('size', this.value.length+1);
	});
	var resultSpan = $('#result');
	$('input').keyup(function() {
		fromBase = $('#fromBase').val();
		toBase = $('#toBase').val();
		num = $('#num').val().toUpperCase();
		result = base_convert(num, fromBase, toBase);
		if (result == 'ERROR') {
			resultSpan.css('color', '#FF0000');
		} else {
			resultSpan.css('color', '#000000');
		}
		resultSpan.html(result);
	});
}
