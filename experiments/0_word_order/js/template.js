

//var TRAIN_INSTANCES = 15;
//var TEST_SINGLE_INSTANCES = 10;
//var TEST_DOUBLE_INSTANCES = 30;



var TRAIN_INSTANCES = 15;
var TEST_SINGLE_INSTANCES = 10;
var TEST_DOUBLE_INSTANCES = 30;

function build_train_trials() {
  //condition 1
  var train_trials = [];
  if (CONDITION == 1) {
    var adj_nouns = _.sample(nouns, TRAIN_INSTANCES);
    var num_nouns = _.sample(nouns, TRAIN_INSTANCES);
    var i;
    for (i in adj_nouns) {
      var noun = adj_nouns[i];
      var adj = _.sample(noun['adj']);
      var n = noun['singular'];
      trial = {
        "noun": n,
        "modifier": adj,
        "type": "adj",
        "responses": [adj + " " + n, n + " " + adj],
        "audio": n + "_" + adj,
        "prompt": adj + " " + n,
        "train": true
      };
      train_trials.push(trial);
    }

    var i;
    for (i in num_nouns) {
      var noun = num_nouns[i];
      var num = _.sample(nums);
      var n = num['singular'] ? noun['singular'] : noun['plural'];
      num = num['num'];
      trial = {
        "noun": n,
        "modifier": num,
        "type": "num",
        "responses": [num + " " + n, n + " " + num],
        "audio": n + "_" + num,
        "prompt": num + " " + n,
        "train": true
      };
      train_trials.push(trial);
    }
  } else if (CONDITION == 2) {
    var adj_nouns = _.sample(nouns, TRAIN_INSTANCES);
    var det_nouns = _.sample(nouns, TRAIN_INSTANCES);


    var i;
    for (i in adj_nouns) {
      var noun = adj_nouns[i];
      var adj = _.sample(noun['adj']);
      var n = noun['singular'];
      trial = {
        "noun": n,
        "modifier": adj,
        "type": "adj",
        "responses": [adj + " " + n, n + " " + adj],
        "audio": n + "_" + adj,
        "prompt": adj + " " + n,
        "train": true
      };
      train_trials.push(trial);
    }

    var i;
    for (i in det_nouns) {
      var noun = det_nouns[i];
      var det = _.sample(dets);
      var n = det['singular'] ? noun['singular'] : noun['plural'];
      det = det['det'];
      trial = {
        "noun": n,
        "modifier": det,
        "type": "det",
        "responses": [det + " " + n, n + " " + det],
        "audio": n + "_" + det,
        "prompt": det + " " + n,
        "train": true
      };
      train_trials.push(trial);
    }
  } else if (CONDITION == 3) {
    var num_nouns = _.sample(nouns, TRAIN_INSTANCES);
    var det_nouns = _.sample(nouns, TRAIN_INSTANCES);


    var i;
    for (i in num_nouns) {
      var noun = num_nouns[i];
      var num = _.sample(nums);
      var n = num['singular'] ? noun['singular'] : noun['plural'];
      num = num['num'];
      trial = {
        "noun": n,
        "modifier": num,
        "type": "num",
        "responses": [num + " " + n, n + " " + num],
        "audio": n + "_" + num,
        "prompt": num + " " + n,
        "train": true
      };
      train_trials.push(trial);
    }

    var i;
    for (i in det_nouns) {
      var noun = det_nouns[i];
      var det = _.sample(dets);
      var n = det['singular'] ? noun['singular'] : noun['plural'];
      det = det['det'];
      trial = {
        "noun": n,
        "modifier": det,
        "type": "det",
        "responses": [det + " " + n, n + " " + det],
        "audio": n + "_" + det,
        "prompt": det + " " + n,
        "train": true
      };
      train_trials.push(trial);
    }
  }

  return train_trials;

}

function _get_modifier_noun(modifier, noun) {
  if (modifier == "adj") {
    mod = _.sample(noun['adj']);
    n = noun['singular'];
  } else if (modifier == "det") {
    mod =  _.sample(dets);
    n = mod['singular'] ? noun['singular'] : noun['plural'];
    mod = mod['det'];
  } else if (modifier == "num") {
    mod = _.sample(nums);
    n = mod['singular'] ? noun['singular'] : noun['plural'];
    mod = mod['num'];
  }
  return [n, mod];
}

function _create_single_modifier_test_trials(modifier, ns, trials) {
  var i;
  for (i in ns) {
    var noun = ns[i];
    var mod_noun = _get_modifier_noun(modifier, noun);
    var mod = mod_noun[1];
    var n = mod_noun[0];
    trial = {
      "noun": n,
      "modifier1": mod,
      "modifier2": null,
      "type": modifier,
      "responses": [mod + " " + n, n + " " + mod],
      "prompt": mod + " " + n,
      "train": false
    };
    trials.push(trial);
  }
}

function _create_double_modifier_test_trials(modifier1, modifier2, ns, trials) {
  var i;
  for (i in ns) {
    var noun = ns[i];
    var mod_noun1 = _get_modifier_noun(modifier1, noun);
    var mod_noun2 = _get_modifier_noun(modifier2, noun);

    while (modifier1 != "adj" && modifier2 != "adj" && mod_noun2[0] != mod_noun1[0]) {
      mod_noun2 = _get_modifier_noun(modifier2, noun);
    }

    var mod1 = mod_noun1[1];
    var mod2 = mod_noun2[1];
    var n = mod_noun2[0];
    trial = {
      "noun": n,
      "modifier1": mod1,
      "modifier2": mod2,
      "type": modifier1 + "_" + modifier2,
      "responses": [mod2 + " " + mod1 + " " +  n, mod1 + " " + mod2 + " " +  n,
                    n + " " + mod1 + " " +  mod2, n + " " + mod2 + " " +  mod1],
      "prompt": mod2 + " " + mod1 + " " +  n,
      "train": false
    };
    trials.push(trial);
  }
}


function build_test_trials() {
  //condition 1
  var test_trials = [];

  var modifier1 = "";
  var modifier2 = "";

  if (CONDITION == 1) {
    modifier1 = "adj";
    modifier2 = "num"
  } else if (CONDITION == 2) {
    modifier1 = "adj";
    modifier2 = "det";
  } else if (CONDITION == 3) {
    modifier1 = "num";
    modifier2 = "det";
  }

  var mod1_nouns = _.sample(nouns, TEST_SINGLE_INSTANCES);
  var mod2_nouns = _.sample(nouns, TEST_SINGLE_INSTANCES);

  var combined_nouns = _.sample(nouns, TEST_DOUBLE_INSTANCES);

  _create_single_modifier_test_trials(modifier1, mod1_nouns, test_trials);
  _create_single_modifier_test_trials(modifier2, mod2_nouns, test_trials);
  _create_double_modifier_test_trials(modifier1, modifier2, combined_nouns, test_trials);

  return test_trials;

}



function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.test_instructions = slide({
    name : "test_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.train_trial = slide({
    name: "train_trial",
    present: exp.train_stims,
    present_handle: function(stim) {
      $(".err").hide();
      this.stim = stim;
      $(".display_condition").html(stim.prompt);
      var responses = _.shuffle(stim.responses);
      $("#response-1").val(responses[0]);
      $("#response-2").val(responses[1]);

    //  $(".response-buttons").attr("disabled", "disabled");
      $("#prompt").hide();

      $("#source-mp3").attr("src", "../stimuli/" + stim.audio + ".mp3");
      $("#source-ogg").attr("src", "../stimuli/" + stim.audio + ".ogg");
      $("#audio-player").load();
      //$("#audio-player").attr("autoplay", "true");




      window.setTimeout(function() {
        $("#audio-player").trigger("play");
      }, 600);

    },
    button : function(response) {
      this.response = response;
      this.log_responses();
      _stream.apply(this);
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : this.stim.type,
        "noun" : this.stim.noun,
        "modifier": this.stim.modifier,
        "stimulus": this.stim.prompt,
        "response" : this.response
      });
    }
  });

  slides.test_trial = slide({
    name: "test_trial",
    present: exp.test_stims,
    present_handle: function(stim) {
      $(".err").hide();
      this.stim = stim;
      $(".test-stimulus").html(stim.prompt);
      var responses = _.shuffle(stim.responses);
      $("#test-response-1").val(responses[0]);
      $("#test-response-2").val(responses[1]);

      if (responses.length > 2) {
        $("#test-response-3").val(responses[2]);
        $("#test-response-4").val(responses[3]);
        $("#test-response-3").show();
        $("#test-response-4").show();
      } else {
        $("#test-response-3").hide();
        $("#test-response-4").hide();
      }



    },
    button : function(response) {
      this.response = response;
      this.log_responses();
      _stream.apply(this);
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : this.stim.type,
        "noun" : this.stim.noun,
        "modifier1": this.stim.modifier1,
        "modifier2": this.stim.modifier2,
        "train": this.stim.train,
        "stimulus": this.stim.prompt,
        "response" : this.response
      });
    }
  });



  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        other_languages : $("#other-language").val(),
        asses : $('input[name="assess"]:checked').val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.condition = CONDITION;
  exp.trials = [];
  exp.catch_trials = [];
  exp.train_stims = _.shuffle(build_train_trials()); //can randomize between subject conditions here
  exp.test_stims = _.shuffle(build_test_trials()); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "train_trial", "test_instructions", "test_trial", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  $(".response-buttons, .test-response-buttons").click(function() {
    _s.button($(this).val());
  });

  $("#audio-player").bind("ended", function() {
    $("#prompt").show();
    //$(".response-buttons").attr("disabled", null);
  });


  exp.go(); //show first slide
}
