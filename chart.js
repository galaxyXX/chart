/**
 * @author TDP
 */
window.Chart = function (container, options) {
    var chart = this;
    var animationOptions = {
        linear: function (t) {
            return t;
        },
        easeInQuad: function (t) {
            return t * t;
        },
        easeOutQuad: function (t) {
            return -1 * t * (t - 2);
        },
        easeInOutQuad: function (t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
            return -1 / 2 * ((--t) * (t - 2) - 1);
        },
        easeInCubic: function (t) {
            return t * t * t;
        },
        easeOutCubic: function (t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1);
        },
        easeInOutCubic: function (t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
            return 1 / 2 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function (t) {
            return t * t * t * t;
        },
        easeOutQuart: function (t) {
            return -1 * ((t = t / 1 - 1) * t * t * t - 1);
        },
        easeInOutQuart: function (t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
            return -1 / 2 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function (t) {
            return 1 * (t /= 1) * t * t * t * t;
        },
        easeOutQuint: function (t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
        },
        easeInOutQuint: function (t) {
            if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
            return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function (t) {
            return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
        },
        easeOutSine: function (t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2));
        },
        easeInOutSine: function (t) {
            return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
        },
        easeInExpo: function (t) {
            return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
        },
        easeOutExpo: function (t) {
            return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
        },
        easeInOutExpo: function (t) {
            if (t == 0) return 0;
            if (t == 1) return 1;
            if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
            return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function (t) {
            if (t >= 1) return t;
            return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
        },
        easeOutCirc: function (t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
        },
        easeInOutCirc: function (t) {
            if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
            return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0) return 0;
            if ((t /= 1) == 1) return 1;
            if (!p) p = 1 * .3;
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
        },
        easeOutElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0) return 0;
            if ((t /= 1) == 1) return 1;
            if (!p) p = 1 * .3;
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
        },
        easeInOutElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0) return 0;
            if ((t /= 1 / 2) == 2) return 1;
            if (!p) p = 1 * (.3 * 1.5);
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
        },
        easeInBack: function (t) {
            var s = 1.70158;
            return 1 * (t /= 1) * t * ((s + 1) * t - s);
        },
        easeOutBack: function (t) {
            var s = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
        },
        easeInOutBack: function (t) {
            var s = 1.70158;
            if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
            return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
        },
        easeInBounce: function (t) {
            return 1 - animationOptions.easeOutBounce(1 - t);
        },
        easeOutBounce: function (t) {
            if ((t /= 1) < (1 / 2.75)) {
                return 1 * (7.5625 * t * t);
            } else if (t < (2 / 2.75)) {
                return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
            } else if (t < (2.5 / 2.75)) {
                return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
            } else {
                return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
            }
        },
        easeInOutBounce: function (t) {
            if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
            return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
        }
    };
    var defaultConfig = {
        width: 20,
        height: 20
    };
    var c = (options) ? mergeChartConfig(defaultConfig, options) : defaultConfig;
    var paper = Raphael(container, c.width, c.height);
    var width = c.width;
    var height = c.height;

    //饼图
    this.Pie = function (data, options) {
        chart.Pie.defaults = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            animation: true,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            onAnimationComplete: null
        };
        var config = (options) ? mergeChartConfig(chart.Pie.defaults, options) : chart.Pie.defaults;
        return new Pie(data, config, paper);
    };

    //救生圈图
    this.Doughnut = function (data, options) {
        chart.Doughnut.defaults = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50, //内外半径比
            animation: true,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            onAnimationComplete: null
        };

        var config = (options) ? mergeChartConfig(chart.Doughnut.defaults, options) : chart.Doughnut.defaults;
        return new Doughnut(data, config, paper);
    };

    //线性图
    this.Line = function (data, options) {
        chart.Line.defaults = {
            scaleOverlay: false,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: true,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 2,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animation: true,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var config = (options) ? mergeChartConfig(chart.Line.defaults, options) : chart.Line.defaults;
        return new Line(data, config, paper);
    }

    //饼图
    var Pie = function (data, config, paper) {
        var segmentTotal = 0;
        var pieRadius = Min([height / 2, width / 2]) - 5;
        for (var i = 0; i < data.length; i++) {
            segmentTotal += data[i].value;
        }
        animationLoop(config, null, drawPieSegments, paper);

        function drawPieSegments(animationDecimal) {
            var cumulativeAngle = -Math.PI / 2,
                scaleAnimation = 1, //伸缩动画
                rotateAnimation = 1; //旋转动画
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate) {
                    rotateAnimation = animationDecimal;
                }
            }
            for (var i = 0; i < data.length; i++) {
                var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
                var c = paper.path().attr({
                    sectorSegment: [width / 2, height / 2, scaleAnimation * pieRadius, cumulativeAngle, cumulativeAngle + segmentAngle]
                });
                if (config.segmentShowStroke) {
                    c.attr({
                        "stroke": config.segmentStrokeColor,
                        "stroke-width": config.segmentStrokeWidth,
                        "fill": data[i].color
                    });
                }
                cumulativeAngle += segmentAngle;
            }
        }
        paper.customAttributes.sectorSegment = function (x, y, r, a1, a2) {
            var flag = (a2 - a1) > Math.PI;
            return {
                path: [
                    ["M", x, y],
                    ["l", r * Math.cos(a1), r * Math.sin(a1)],
                    ["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)],
                    ["z"]
                ],
            };
        };
    }

    //救生圈图
    var Doughnut = function (data, config, paper) {
        var segmentTotal = 0;
        var doughnutRadius = Min([height / 2, width / 2]) - 5;
        var cutoutRadius = doughnutRadius * (config.percentageInnerCutout / 100);

        for (var i = 0; i < data.length; i++) {
            segmentTotal += data[i].value;
        }

        animationLoop(config, null, drawDoughnutSegments, paper);

        function drawDoughnutSegments(animationDecimal) {
            var cumulativeAngle = -Math.PI / 2,
                scaleAnimation = 1,
                rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate) {
                    rotateAnimation = animationDecimal;
                }
            }
            for (var i = 0; i < data.length; i++) {
                var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
                var c = paper.path().attr({
                    doughnutSegment: [
                        width / 2,
                        height / 2,
                        scaleAnimation * doughnutRadius,
                        scaleAnimation * cutoutRadius,
                        cumulativeAngle,
                        cumulativeAngle + segmentAngle
                    ]
                });
                if (config.segmentShowStroke) {
                    c.attr({
                        "stroke": config.segmentStrokeColor,
                        "stroke-width": config.segmentStrokeWidth,
                        "fill": data[i].color
                    });
                }
                cumulativeAngle += segmentAngle;
            }
        }
        paper.customAttributes.doughnutSegment = function (x, y, r1, r2, a1, a2) {
            var flag = (a2 - a1) > Math.PI;
            return {
                path: [
                    ["M", x, y], //绝对定位到(x,y点)
                    ["l", r1 * Math.cos(a1), r1 * Math.sin(a1)],
                    ["A", r1, r1, 0, +0, 1, x + r1 * Math.cos(a2), y + r1 * Math.sin(a2)], //内圈逆时针
                    ["L", r2 * Math.cos(a2) + x, r2 * Math.sin(a2) + y],
                    ["A", r2, r2, 0, +0, 0, x + r2 * Math.cos(a1), y + r2 * Math.sin(a1)], //外圈顺时针
                    ["z"]
                ],
            };
        };
    }

    var Line = function (data, config, paper) {
        var maxSize, //
            scaleHop, //缩放
            calculatedScale,
            labelHeight,
            scaleHeight,
            valueBounds,
            labelTemplateString,
            valueHop,
            longestYText,
            widestXLabel, //X轴label最大宽度
            xAxisLength, //X轴长度
            yAxisPosX, //y轴原点x坐标
            xAxisPosY, //x轴原点y坐标
            rotateLabels = 0; //横坐标label旋转角度

        calculateDrawingSizes(); //计算labelHeight, rotateLabels(存在旋转45度和90度), scaleHeight = height - labelHeight, widestXLabel

        valueBounds = getValueBounds(); //获取Y轴值边界
        //Check and set the scale
        labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : "";
        if (!config.scaleOverride) {
            calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
        } else {
            calculatedScale = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            }
            populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth);
        }

        scaleHop = Math.floor(scaleHeight / calculatedScale.steps); //Y轴刻度的高度
        calculateXAxisSize(); //计算xAxisLength, valueHop, (xAxisPosY, yAxisPosX)
        animationLoop(config, drawScale, drawLines, paper);

        function drawLines(animPc) {
            for (var i = 0; i < data.datasets.length; i++) {
                var path = [
                    ["M", yAxisPosX, xAxisPosY - animPc * (calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop))]
                ]
                for (var j = 1; j < data.datasets[i].data.length; j++) {
                    if (config.bezierCurve) {
                        path = path.concat(["C", xPos(j - 0.5), yPos(i, j - 1), xPos(j - 0.5), yPos(i, j), xPos(j), yPos(i, j)]);
                    } else {
                        path = path.concat(["L", xPos(j), yPos(i, j)]);
                    }
                }
                if (config.datasetFill) {
                    var pathfill = [
                        ["L", yAxisPosX + (valueHop * (data.datasets[i].data.length - 1)), xAxisPosY],
                        ["L", yAxisPosX, xAxisPosY],
                        ["z"]
                    ];
                    path = path.concat(pathfill);
                }
                var line = paper.path(path.join(","));
                line.attr({
                    "stroke": data.datasets[i].strokeColor,
                    "stroke-width": config.datasetStrokeWidth,
                    "fill": data.datasets[i].fillColor
                });
                if (config.pointDot) {
                    for (var k = 0; k < data.datasets[i].data.length; k++) {
                        var c = paper.circle(yAxisPosX + (valueHop * k),
                            xAxisPosY - animPc * (calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop)),
                            config.pointDotRadius);
                        c.attr({
                            "stroke": data.datasets[i].pointStrokeColor,
                            "stroke-width": config.pointDotStrokeWidth,
                            "fill": data.datasets[i].pointColor
                        });
                    }
                }
            }

            function yPos(dataSet, iteration) {
                return xAxisPosY - animPc * (calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop));
            }

            function xPos(iteration) {
                return yAxisPosX + (valueHop * iteration);
            }
        }

        function drawScale() {
            //X axis line
            var xaxispath = [
                ["M", width - widestXLabel / 2 + 5, xAxisPosY],
                ["L", width - (widestXLabel / 2) - xAxisLength - 5, xAxisPosY]
            ];
            var xAxis = paper.path(xaxispath.join(",")).attr({
                "stroke": config.scaleLineColor,
                "stroke-width": config.scaleLineWidth
            });
            var font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
            var txt = {
                "font": font
            };
            for (var i = 0; i < data.labels.length; i++) {
                if (rotateLabels > 0) {
                    var transform = [
                        ["T", yAxisPosX + i * valueHop, xAxisPosY + labelHeight],
                        ["r", -rotateLabels]
                    ];
                    paper.text(0, 0, data.labels[i]).transform(transform.join(",")).attr(txt);
                } else {
                    paper.text(yAxisPosX + i * valueHop, xAxisPosY + labelHeight + 3, data.labels[i]).attr(txt);
                }

                var xscalepath = [
                    ["M", yAxisPosX + i * valueHop, xAxisPosY + 3]
                ];
                //Check i isnt 0, so we dont go over the Y axis twice.
                if (config.scaleShowGridLines && i > 0) {
                    xscalepath = xscalepath.concat(["L", yAxisPosX + i * valueHop, 5]);
                } else {
                    xscalepath = xscalepath.concat(["L", yAxisPosX + i * valueHop, xAxisPosY + 3]);
                }
                var xscales = paper.path(xscalepath.join(",")).attr({
                    "stroke": config.scaleGridLineColor,
                    "stroke-width": config.scaleGridLineWidth
                });
            }

            //Y axis
            var yaxispath = [
                ["M", yAxisPosX, xAxisPosY + 5],
                ["L", yAxisPosX, 5]
            ];
            var yAxis = paper.path(yaxispath.join(",")).attr({
                "stroke": config.scaleLineColor,
                "stroke-width": config.scaleLineWidth
            });
            for (var j = 0; j < calculatedScale.steps; j++) {
                var yscalepath = [
                    ["M", yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop)]
                ];
                if (config.scaleShowGridLines) {
                    yscalepath = yscalepath.concat(["L", yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop)]);
                } else {
                    yscalepath = yscalepath.concat(["L", yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop)]);
                }
                var yscales = paper.path(yscalepath.join(",")).attr({
                    "stroke": config.scaleGridLineColor,
                    "stroke-width": config.scaleGridLineWidth
                });

                if (config.scaleShowLabels) {
                    paper.text(yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop), calculatedScale.labels[j]).attr(txt);
                }
            }
        }

        function calculateXAxisSize() {
            var longestText = 1;
			var heightestText = 1;
            //if we are showing the labels in Y axis
            var font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
            if (config.scaleShowLabels) {
                for (var i = 0; i < calculatedScale.labels.length; i++) {
                    var measuredWText = measureTextWidthOrHeight(calculatedScale.labels[i], "width", font);
					var measuredHText = measureTextWidthOrHeight(calculatedScale.labels[i], "height", font);
                    longestText = (measuredWText > longestText) ? measuredWText : longestText;
					heightestText = (measuredHText > heightestText) ? measuredHText : heightestText;
                }
                //Add a little extra padding from the y axis
                longestText += 10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength / (data.labels.length - 1));

            yAxisPosX = width - widestXLabel / 2 - xAxisLength;
            xAxisPosY = scaleHeight + heightestText / 2;
        }

        function calculateDrawingSizes() {
            maxSize = height;

            //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
            labelHeight = 1;
            widestXLabel = 1;
            var font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
            for (var i = 0; i < data.labels.length; i++) {
                var textLength = measureTextWidthOrHeight(data.labels[i], "width", font);
				var textHeight = measureTextWidthOrHeight(data.labels[i], "height", font);
                //If the text length is longer - make that equal to longest text!
                widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
				labelHeight = (textHeight > labelHeight) ? textHeight : labelHeight;
            }
            if (width / data.labels.length < widestXLabel) {
                rotateLabels = 45;
                if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
                    rotateLabels = 90;
                    maxSize -= widestXLabel;
                } else {
                    maxSize -= Math.sin(rotateLabels) * widestXLabel;
                }
            } else {
                maxSize -= labelHeight;//config.scaleFontSize;
            }
            maxSize -= 5;
            maxSize -= labelHeight;
            scaleHeight = maxSize;
        }

        //获取Y轴值边界
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            //找出最大值,最小值
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.datasets[i].data.length; j++) {
                    if (data.datasets[i].data[j] > upperValue) {
                        upperValue = data.datasets[i].data[j]
                    };
                    if (data.datasets[i].data[j] < lowerValue) {
                        lowerValue = data.datasets[i].data[j]
                    };
                }
            };

            var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));

            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: maxSteps,
                minSteps: minSteps
            };
        }
    };

    //help function
    function calculateOffset(val, calculatedScale, scaleHop) {
        var outerValue = calculatedScale.steps * calculatedScale.stepValue;
        var adjustedValue = val - calculatedScale.graphMin;
        var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
        return (scaleHop * calculatedScale.steps) * scalingFactor;
    }

    function animationLoop(config, drawScale, drawData, paper) {
        var animFrameAmount = (config.animation) ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1,
            easingFunction = animationOptions[config.animationEasing],
            percentAnimComplete = (config.animation) ? 0 : 1;

        if (typeof drawScale !== "function") drawScale = function () {};
        requestAnimFrame(animLoop);

        function animateFrame() {
            var easeAdjustedAnimationPercent = (config.animation) ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
            paper.clear();
            if (config.scaleOverlay) {
                drawData(easeAdjustedAnimationPercent);
                drawScale();
            } else {
                drawScale();
                drawData(easeAdjustedAnimationPercent);
            }
        }

        function animLoop() {
            percentAnimComplete += animFrameAmount;
            animateFrame();
            if (percentAnimComplete <= 1) {
                requestAnimFrame(animLoop);
            } else {
                if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
            }
        }
    }

    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
        };
    })();

    function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
        //drawingHeight：绘图区高度
        var graphMin,
            graphMax,
            graphRange,
            stepValue,
            numberOfSteps,
            valueRange,
            rangeOrderOfMagnitude,
            decimalNum;
        valueRange = maxValue - minValue;
        rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);
        graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
        graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
        graphRange = graphMax - graphMin;
        stepValue = Math.pow(10, rangeOrderOfMagnitude);
        numberOfSteps = Math.round(graphRange / stepValue);
        //Compare number of steps to the max and min for that size graph, and add in half steps if need be.	        
        while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
            if (numberOfSteps < minSteps) {
                stepValue /= 2;
                numberOfSteps = Math.round(graphRange / stepValue);
            } else {
                stepValue *= 2;
                numberOfSteps = Math.round(graphRange / stepValue);
            }
        };
        var labels = [];
        populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);
        return {
            steps: numberOfSteps,
            stepValue: stepValue,
            graphMin: graphMin,
            labels: labels
        }

        //10为底，val的对数，向下取整
        function calculateOrderOfMagnitude(val) {
            return Math.floor(Math.log(val) / Math.LN10);
        }
    }

    //Populate an array of all the labels by interpolating the string.

    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) {
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i = 1; i < numberOfSteps + 1; i++) {
                labels.push(tmpl(labelTemplateString, {
                    value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))
                }));
            }
        }
    }

    //Max value from array

    function Max(array) {
        return Math.max.apply(Math, array);
    };
    //Min value from array

    function Min(array) {
        return Math.min.apply(Math, array);
    };
    //Default if undefined

    function Default(userDeclared, valueIfFalse) {
        if (!userDeclared) {
            return valueIfFalse;
        } else {
            return userDeclared;
        }
    };
    //Is a number function

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    //Apply cap a value at a high or low number

    function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue)) {
            if (valueToCap > maxValue) {
                return maxValue;
            }
        }
        if (isNumber(minValue)) {
            if (valueToCap < minValue) {
                return minValue;
            }
        }
        return valueToCap;
    }

    function getDecimalPlaces(num) {
        var numberOfDecimalPlaces;
        if (num % 1 != 0) {
            return num.toString().split(".")[1].length
        } else {
            return 0;
        }
    }

    function mergeChartConfig(defaults, userDefined) {
        var returnObj = {};
        for (var attrname in defaults) {
            returnObj[attrname] = defaults[attrname];
        }
        for (var attrname in userDefined) {
            returnObj[attrname] = userDefined[attrname];
        }
        return returnObj;
    }

    //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
    var cache = {};

    function tmpl(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'") + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    };

    function measureTextWidthOrHeight(text, name, font) {
        var span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.font = "Arial, normal, 12px";
        var txt = document.createTextNode(text);
        span.appendChild(txt);
        document.body.appendChild(span);
        var result = getWidthOrHeight(span, name);
        document.body.removeChild(span);
        return result;
    }

    function getWidthOrHeight(elem, name, extra) {
        var computedCss = undefined;
        if (document.documentElement.currentStyle) {
            computedCss = function (elem, name) {
                return elem.currentStyle[name];
            }
        }
        if (document.defaultView && document.defaultView.getComputedStyle) {
            computedCss = function (elem, name) {
                return document.defaultView.getComputedStyle(elem, null)[name];
            }
        }

        return (function (elem, name, extra) {
            // Start with offset property
            var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
                i = name === "width" ? 1 : 0,
                len = 4;
            var cssExpand = ["Top", "Right", "Bottom", "Left"];
            var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i;
            if (val > 0) {
                if (extra !== "border") {
                    for (; i < len; i += 2) {
                        if (!extra) {

                            val -= parseFloat(elem.style["padding" + cssExpand[i]]) || 0;
                        }
                        if (extra === "margin") {

                            val += parseFloat(elem.style[extra + cssExpand[i]]) || 0;
                        } else {

                            val -= parseFloat(elem.style["border" + cssExpand[i] + "Width"]) || 0;
                        }
                    }
                }
                return val;
            }
            // Fall back to computed then uncomputed css if necessary
            val = computedCss(elem, name);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }
            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
            // Add padding, border, margin
            if (extra) {
                for (; i < len; i += 2) {
                    val += parseFloat(elem.style["padding" + cssExpand[i]]) || 0;
                    if (extra !== "padding") {
                        val += parseFloat(elem.style["border" + cssExpand[i] + "Width"]) || 0;
                    }
                    if (extra === "margin") {
                        val += parseFloat(elem.style[extra + cssExpand[i]]) || 0;
                    }
                }
            }
            return val;
        })(elem, name);
    }
}
