(function () {
    'use strict';

    function typeSort(type1, type2) {
        const typeName1 = type1.typeName;
        const typeName2 = type2.typeName;

        let result = typeName1 === typeName2 ? 0 : -1;

        return typeName1 > typeName2 ? 1 : result;
    }

    let basicTypes = typeSetup.getBasicTypes();
    let advancedTypes = typeSetup.getAdvancedTypes();

    function createTypeOption(typeName, key) {
        const typeOption = document.createElement('option');

        typeOption.setAttribute('value', key);
        typeOption.innerText = typeName;

        return typeOption;
    }

    function loadTypeSelection(typeSelect) {
        basicTypes.forEach(function (typeDefinition, index) {
            const key = `basic-${index}`;
            const typeOption = createTypeOption(typeDefinition.typeName, key);

            typeSelect.appendChild(typeOption);
        });
    }

    function getOption(selectBox) {
        const selectedIndex = selectBox.selectedIndex;
        return selectBox.options[selectedIndex];
    }

    function parseKey(key) {
        const tokens = key.split('-');

        return {
            collection: tokens[0],
            index: tokens[1]
        };
    }

    function sanitizeTypeString(typeString) {
        return typeString.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function buildExampleList(typeExamples) {
        return typeExamples
            .map(function (example) {
                const sanitizedExample = sanitizeTypeString(example);
                return `<li class="code">${sanitizedExample}</li>`;
            })
            .join('\n');
    }

    function buildDataDisplay(typeDefinition) {
        const typeInfoDiv = document.getElementById('type-info');
        const examples = buildExampleList(typeDefinition.examples);
        const usage = sanitizeTypeString(typeDefinition.usage);

        typeInfoDiv.innerHTML = `
<div>
    <span class="title">Type Name:</span> 
    ${typeDefinition.typeName}
</div>
<div>
    <span class="title">Value Type Info:</span> 
    ${typeDefinition.description}
</div>
<div>
    <span class="title">Usage:</span> 
    <span class="code">${usage}</span>
</div>
<div>
    <span class="title">Examples:</span>
    <ul>
        ${examples}
    </ul>
</div>
        `;
    }

    function displayTypeInfo(typeSelect, selectedKey) {
        const { collection, index } = parseKey(selectedKey);

        const typeDefinition = basicTypes[index];

        buildDataDisplay(typeDefinition);
    }

    function clearTypeInfo() {
        const typeInfoDiv = document.getElementById('type-info');
        typeInfoDiv.innerHTML = '';
    }

    function prepareDataAndRegisterEvents() {
        const typeSelect = document.getElementById('types-select');

        loadTypeSelection(typeSelect);

        typeSelect.addEventListener('change', function (event) {
            const selectedKey = getOption(typeSelect).value.trim();

            if(selectedKey === 'no type') {
                clearTypeInfo();
            } else {
                displayTypeInfo(typeSelect, selectedKey);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', prepareDataAndRegisterEvents);

})();