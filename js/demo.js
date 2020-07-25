$(function() {
  var problems = [
    'Soy adicto a las compras, y no quiero quedar en banca rota.',
    'Quiero ir a la luna, y necesito un medio de transporte.',
    'Quiero bajar 10kg de peso en 1 mes.',
    'Quiero ir a la final de la Champions League.',
    'Quiero ser mi propio jefe.',
    'Quiero viajar a China.',
    'Quiero tener 1M de followers en Instagram.',
    'Quiero que mi vecina chismosa se mude.',
    'Se me acabo el papel higienico',
    'Me da flojera lavar el tapabocas'
  ];
  problems = problems.sort(() => Math.random() - 0.5);
  console.log(problems);
  var products = [
    'Abejas',
    'Un esqueleto humano',
    'Un planeta enano',
    'Una estatua',
    'Un par de zapatos',
    'Un jugo de borojó',
    'Herbalife',
    'Un set de maquillaje',
    'Una bicicleta',
    'Repelente de dragones',
    'Peine para calvos',
    'Desodorante para flatulencias',
    'Detector de ovnis para el celular',
    'Molde para hacer huevos fritos en forma de pistola',
    'Acariciador de elefantes',
    'Almohada con forma de torso y brazo humano'
  ];
  products = products.sort(() => Math.random() - 0.5);
  console.log(products);
  var features = [
    'Dispara rayos laser',
    'Te vuelve invisible',
    'Se desvanece si lo toca el agua',
    'No funciona entre 9AM y 11AM',
    'Hace mucho ruido',
    'No le gusta a los niños',
    'Se alimenta de odio',
    'Espanta las brujas',
    'Huele a pescado'
  ];
  features = features.sort(() => Math.random() - 0.5);
  console.log(features);

  var imgGenerator = function(container, text, w) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = 120;
    var ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    // var text = $("#the_text").text();
    ctx.fillText(text, 10, 50);
    var img = document.createElement('img');
    img.src = canvas.toDataURL();
    $(container).append(img);
    //$("body").append(canvas);
  };

  problems.forEach(item => {
    imgGenerator('#roulette-problems', item, 1028);
  });
  products.forEach(item => {
    imgGenerator('#roulette-products', item, 600);
  });
  features.forEach(item => {
    imgGenerator('#roulette-features', item, 600);
  });

  // $('.roulette').find('img').hover(function(){
  // 	console.log($(this).height());
  // });
  // var appendLogMsg = function(msg) {
  // 	$('#msg')
  // .append('<p class="muted">' + msg + '</p>')
  // .scrollTop(100000000);
  //
  // }
  var nextStopImageNumber = 0;
  var p = {
    startCallback: function() {
      // appendLogMsg('start');
      $('#speed, #duration').slider('disable');
      $('#stopImageNumber').spinner('disable');
      $('.start').attr('disabled', 'true');
      $('.stop').removeAttr('disabled');
    },
    slowDownCallback: function() {
      // appendLogMsg('slowdown');
      $('.stop').attr('disabled', 'true');
    },
    stopCallback: function($stopElm) {
      // appendLogMsg('stop');
      $('#speed, #duration').slider('enable');
      $('#stopImageNumber').spinner('enable');
      $('.start').removeAttr('disabled');
      $('.stop').attr('disabled', 'true');
    }
  };

  var rouletter = $('div.roulette');
  rouletter.roulette(p);
  $('.stop').click(function() {
    var stopImageNumber = $('.stopImageNumber').val();
    if (stopImageNumber == '') {
      stopImageNumber = null;
    }
    rouletter.roulette('stop');
  });
  $('.stop').attr('disabled', 'true');
  $('.start').click(function() {
    rouletter.roulette('start');
    updateStopImageNumber(nextStopImageNumber);
  });

  var updateParamater = function() {
    p['speed'] = Number(
      $('.speed_param')
        .eq(0)
        .text()
    );
    p['duration'] = Number(
      $('.duration_param')
        .eq(0)
        .text()
    );
    p['stopImageNumber'] = Number(
      $('.stop_image_number_param')
        .eq(0)
        .text()
    );
    rouletter.roulette('option', p);
  };
  var updateSpeed = function(speed) {
    $('.speed_param').text(speed);
  };
  $('#speed').slider({
    min: 1,
    max: 30,
    value: 10,
    slide: function(event, ui) {
      updateSpeed(ui.value);
      updateParamater();
    }
  });
  updateSpeed($('#speed').slider('value'));

  var updateDuration = function(duration) {
    $('.duration_param').text(duration);
  };
  $('#duration').slider({
    min: 2,
    max: 10,
    value: 3,
    slide: function(event, ui) {
      updateDuration(ui.value);
      updateParamater();
    }
  });
  updateDuration($('#duration').slider('value'));

  var updateStopImageNumber = function(stopImageNumber) {
    $('.image_sample')
      .children()
      .css('opacity', 0.2);
    $('.image_sample')
      .children()
      .filter('[data-value="' + stopImageNumber + '"]')
      .css('opacity', 1);
    $('.stop_image_number_param').text(stopImageNumber);
    updateParamater();
    nextStopImageNumber += 1;
    console.log('nextStopImageNumber', nextStopImageNumber);
  };

  $('#stopImageNumber').spinner({
    spin: function(event, ui) {
      var imageNumber = ui.value;
      if (ui.value > 4) {
        $(this).spinner('value', -1);
        imageNumber = 0;
        updateStopImageNumber(-1);
        return false;
      } else if (ui.value < -1) {
        $(this).spinner('value', 4);
        imageNumber = 4;
        updateStopImageNumber(4);
        return false;
      }
      updateStopImageNumber(imageNumber);
    }
  });
  $('#stopImageNumber').spinner('value', 0);
  updateStopImageNumber($('#stopImageNumber').spinner('value'));

  // $('.image_sample').children().click(function(){
  // 	var stopImageNumber = $(this).attr('data-value');
  // 	$('#stopImageNumber').spinner('value', stopImageNumber);
  // 	updateStopImageNumber(stopImageNumber);
  // });

  // updateStopImageNumber(nextStopImageNumber);

  //countdown
  // $('#countdown-timer').countdown('2020/07/23', function(event) {
  //   $(this).html(event.strftime('%H:%M:%S'));
  // });
  var timer = new Timer();

  $('#countdown-start').click(function() {
    $('#countdownExample .values').removeClass('text-error');
    $('#countdownExample .values').addClass('text-warning');
    timer.start({ countdown: true, startValues: { minutes: 2 } });
  });
  $('#countdownExample .values').html(timer.getTimeValues().toString());
  timer.addEventListener('secondsUpdated', function(e) {
    $('#countdownExample .values').html(timer.getTimeValues().toString());
  });
  timer.addEventListener('targetAchieved', function(e) {
    $('#countdownExample .values').removeClass('text-warning');
    $('#countdownExample .values').addClass('text-error');
    $('#countdownExample .values').html('KABOOM!!');
  });
});
