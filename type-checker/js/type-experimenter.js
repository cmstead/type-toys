(function () {
    'use strict';

    function getTypeString() {
        return document.getElementById('type-string-input').value.trim();
    }

    function getJsonValue() {
        const jsonString = document.getElementById('value-expression-input').value.trim();

        return jsonString === '' || jsonString === 'undefined'
            ? undefined
            : JSON.parse(jsonString);
    }

    function sanitizeTypeString(typeString) {
        return typeString.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function outputResult(message, messageType) {
        const outputSection = document.getElementById('test-run-output');
        const messageClass = messageType === 'error' ? 'error' : 'message';

        outputSection.innerHTML = `<pre class="${messageClass}">${message}</pre>`;
    }

    function throwOnBadType(typeString) {
        if(typeString === '') {
            throw new Error('Type string cannot empty.');
        }

        return typeString;
    }

    function evaluate() {
        try {
            const typeString = throwOnBadType(getTypeString());
            const sanitizedTypeString = sanitizeTypeString(typeString);
            const jsonValue = getJsonValue();

            const result = signet.isTypeOf(typeString)(jsonValue);

            outputResult(`Testing your value against <span class="type-string">${sanitizedTypeString}</span> evaluates to ${result}.`);
        } catch (e) {
            let message;
            // const sanitizedTypeString = sanitizeTypeString(typeString);

            if(e.message.includes('expected a value of type')) {
                const typeString = e.message.replace(/^.*but got ([^\s]+) of type.*$/, '$1');
                const sanitizedTypeString = sanitizeTypeString(typeString);

                message = `String ${sanitizedTypeString} is not a valid type.`;
            } else {
                message = e.message.split('\n').join('\n<br>');
            }

            outputResult(message, 'error');
        }
    }

    function registerEvaluator() {
        const testExpressionButton = document.getElementById('test-expression');
        testExpressionButton.addEventListener('click', evaluate);
    }

    document.addEventListener('DOMContentLoaded', registerEvaluator);

})();