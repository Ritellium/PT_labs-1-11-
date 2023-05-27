package com.example.lab11_try2;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    // Поля ввода для каждой величины
    private EditText radiansEditText;
    private EditText minutesEditText;
    private EditText secondsEditText;
    private EditText degreesEditText;
    private EditText gradsEditText;
    private EditText milsEditText;
    // IDs
    private static final int idRads = R.id.radiansEditText;
    private static final int idMins = R.id.minutesEditText;
    private static final int idSecs = R.id.secondsEditText;
    private static final int idDegs = R.id.degreesEditText;
    private static final int idGrads = R.id.gradsEditText;
    private static final int idMils = R.id.milsEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

// Получаем ссылки на поля ввода по их id
        radiansEditText = findViewById(R.id.radiansEditText);
        minutesEditText = findViewById(R.id.minutesEditText);
        secondsEditText = findViewById(R.id.secondsEditText);
        degreesEditText = findViewById(R.id.degreesEditText);
        gradsEditText = findViewById(R.id.gradsEditText);
        milsEditText = findViewById(R.id.milsEditText);

// Добавляем слушатели на изменение текста в каждом поле ввода
        radiansEditText.addTextChangedListener(new AngleTextWatcher());
        minutesEditText.addTextChangedListener(new AngleTextWatcher());
        secondsEditText.addTextChangedListener(new AngleTextWatcher());
        degreesEditText.addTextChangedListener(new AngleTextWatcher());
        gradsEditText.addTextChangedListener(new AngleTextWatcher());
        milsEditText.addTextChangedListener(new AngleTextWatcher());
    }

    // Внутренний класс для слушателя изменения текста
    private class AngleTextWatcher implements TextWatcher {
        private boolean isUpdating = false;

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
        }

        @Override
        public void afterTextChanged(Editable s) {
            if (isUpdating) {
                return;
            }
            isUpdating = true;

            View focusedView = getCurrentFocus();
            if (focusedView != null && focusedView instanceof EditText) {
                EditText focusedEditText = (EditText) focusedView;

                String valueString = focusedEditText.getText().toString();
                double value = 0.0;
                try {
                    value = Double.parseDouble(valueString);
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                }

                int id = focusedEditText.getId();
                String unit = "";
                if (id == idRads) {
                    unit = "radians";
                } else if (id == idMins) {
                    unit = "minutes";
                } else if (id == idSecs) {
                    unit = "seconds";
                } else if (id == idDegs) {
                    unit = "degrees";
                } else if (id == idGrads) {
                    unit = "grads";
                } else if (id == idMils) {
                    unit = "mils";
                }

                double radians = 0.0;
                switch (unit) {
                    case "radians":
                        radians = value;
                        break;
                    case "minutes":
                        radians = AngleConverter.minutesToRadians(value);
                        break;
                    case "seconds":
                        radians = AngleConverter.secondsToRadians(value);
                        break;
                    case "degrees":
                        radians = AngleConverter.degreesToRadians(value);
                        break;
                    case "grads":
                        radians = AngleConverter.gradsToRadians(value);
                        break;
                    case "mils":
                        radians = AngleConverter.milsToRadians(value);
                        break;
                }

                if (unit != "radians") {
                    radiansEditText.setText(String.valueOf(radians));
                }
                if (unit != "minutes") {
                    minutesEditText.setText(String.valueOf(AngleConverter.radiansToMinutes(radians)));
                }
                if (unit != "seconds") {
                    secondsEditText.setText(String.valueOf(AngleConverter.radiansToSeconds(radians)));
                }
                if (unit != "degrees") {
                    degreesEditText.setText(String.valueOf(AngleConverter.radiansToDegrees(radians)));
                }
                if (unit != "grads") {
                    gradsEditText.setText(String.valueOf(AngleConverter.radiansToGrads(radians)));
                }
                if (unit != "mils") {
                    milsEditText.setText(String.valueOf(AngleConverter.radiansToMils(radians)));
                }
            }

            isUpdating = false;
        }
    }
}