<?php

class TranslationUnit
{
    public int $id;
    public string $sourceText;
    public string $translatedText;
    public string $languageFrom;
    public string $languageTo;
    public string $createdAt;
    public string $updatedAt;

    public function __construct(
        int $id,
        string $sourceText,
        string $translatedText,
        string $languageFrom,
        string $languageTo
    ) {
        $this->id = $id;
        $this->sourceText = $sourceText;
        $this->translatedText = $translatedText;
        $this->languageFrom = $languageFrom;
        $this->languageTo = $languageTo;
        $this->createdAt = date('Y-m-d H:i:s');
        $this->updatedAt = date('Y-m-d H:i:s');
    }

    public function updateTranslation(string $newTranslation): void
    {
        $this->translatedText = $newTranslation;
        $this->updatedAt = date('Y-m-d H:i:s');
    }
}
