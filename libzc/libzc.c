typedef struct
{
    void *inputBuffer;
    unsigned long inputSize;
    unsigned long currOffset;
    void *outputBuffer;
    unsigned long totalDone;
} crypt_buffer_t;

crypt_buffer_t *AllocateData(void)
{
    crypt_buffer_t *buffer;

    buffer = (crypt_buffer_t *)malloc(20);
    return buffer;
}

void DestroyData(crypt_buffer_t *buffer)
{
    if (buffer->outputBuffer != (void *)0x0)
    {
        free(buffer->outputBuffer);
        buffer->outputBuffer = (void *)0x0;
    }
    buffer->totalDone = 0;
    free(buffer);
    return;
}

void *ProcessedDataGet(crypt_buffer_t *buffer, unsigned long *pSize)
{
    *pSize = buffer->totalDone;
    return buffer->outputBuffer;
}

void SetupData(crypt_buffer_t *buffer, void *encryptedBuffer, unsigned long encryptedSize, unsigned long offset)
{
    buffer->inputBuffer = encryptedBuffer;
    buffer->inputSize = encryptedSize;
    buffer->currOffset = offset;
    buffer->outputBuffer = (void *)0x0;
    buffer->totalDone = 0;
    return;
}

bool SetupKeys(bool verbose)
{
    int iVar1;
    undefined qcSerial[12];
    FILE *qcSerialFP;
    char *qcSerialNumberFilePath;

    memset(&JSON_KEY_0, 0, 132);
    memset(&CNS_KEY_0, 0, 132);
    JSON_KEY_0 = KEY_0;
    JSON_KEY_1 = KEY_1;
    JSON_KEY_2 = KEY_2;
    JSON_KEY_3 = KEY_3;
    JSON_KEY_4 = KEY_4;
    JSON_KEY_5 = KEY_5;
    JSON_KEY_6 = KEY_6;
    JSON_KEY_7 = KEY_7;
    JSON_KEY_8 = KEY_8;
    JSON_KEY_9 = KEY_9;
    JSON_KEY_10 = KEY_10;
    JSON_KEY_11 = KEY_11;
    JSON_KEY_12 = KEY_12;
    JSON_KEY_13 = KEY_13;
    JSON_KEY_14 = (undefined)KEY_14;
    JSON_KEY_LENGTH = 57;
    qcSerialNumberFilePath = getenv("QC_SERIAL_NUMBER");
    if (qcSerialNumberFilePath == (char *)0x0)
    {
        if (verbose)
        {
            fwrite("[ZC] No serial found [3]\n", 1, 0x19, stderr);
        }
        CNS_KEY_0 = KEY_0;
        CNS_KEY_1 = KEY_1;
        CNS_KEY_2 = KEY_2;
        CNS_KEY_3 = KEY_3;
        CNS_KEY_4 = KEY_4;
        CNS_KEY_5 = KEY_5;
        CNS_KEY_6 = KEY_6;
        CNS_KEY_7 = KEY_7;
        CNS_KEY_8 = KEY_8;
        CNS_KEY_9 = KEY_9;
        CNS_KEY_10 = KEY_10;
        CNS_KEY_11 = KEY_11;
        CNS_KEY_12 = KEY_12;
        CNS_KEY_13 = KEY_13;
        CNS_KEY_14 = (undefined)KEY_14;
        CNS_KEY_LENGTH = 57;
    }
    else
    {
        iVar1 = access(qcSerialNumberFilePath, 0);
        if (iVar1 == -1)
        {
            if (verbose)
            {
                fwrite("[ZC] No serial found [2]\n", 1, 0x19, stderr);
            }
            CNS_KEY_0 = KEY_0;
            CNS_KEY_1 = KEY_1;
            CNS_KEY_2 = KEY_2;
            CNS_KEY_3 = KEY_3;
            CNS_KEY_4 = KEY_4;
            CNS_KEY_5 = KEY_5;
            CNS_KEY_6 = KEY_6;
            CNS_KEY_7 = KEY_7;
            CNS_KEY_8 = KEY_8;
            CNS_KEY_9 = KEY_9;
            CNS_KEY_10 = KEY_10;
            CNS_KEY_11 = KEY_11;
            CNS_KEY_12 = KEY_12;
            CNS_KEY_13 = KEY_13;
            CNS_KEY_14 = (undefined)KEY_14;
            CNS_KEY_LENGTH = 57;
        }
        else
        {
            qcSerialFP = fopen(qcSerialNumberFilePath, "r");
            if (qcSerialFP == (FILE *)0x0)
            {
                if (verbose)
                {
                    fwrite("[ZC] No serial found [1]\n", 1, 0x19, stderr);
                }
                CNS_KEY_0 = KEY_0;
                CNS_KEY_1 = KEY_1;
                CNS_KEY_2 = KEY_2;
                CNS_KEY_3 = KEY_3;
                CNS_KEY_4 = KEY_4;
                CNS_KEY_5 = KEY_5;
                CNS_KEY_6 = KEY_6;
                CNS_KEY_7 = KEY_7;
                CNS_KEY_8 = KEY_8;
                CNS_KEY_9 = KEY_9;
                CNS_KEY_10 = KEY_10;
                CNS_KEY_11 = KEY_11;
                CNS_KEY_12 = KEY_12;
                CNS_KEY_13 = KEY_13;
                CNS_KEY_14 = (undefined)KEY_14;
                CNS_KEY_LENGTH = 57;
            }
            else
            {
                CNS_KEY_0 = KEY_0;
                CNS_KEY_1 = KEY_1;
                CNS_KEY_2 = KEY_2;
                CNS_KEY_3 = KEY_3;
                CNS_KEY_4 = KEY_4;
                CNS_KEY_5 = KEY_5;
                CNS_KEY_6 = KEY_6;
                CNS_KEY_7 = KEY_7;
                CNS_KEY_8 = KEY_8;
                CNS_KEY_9 = KEY_9;
                CNS_KEY_10 = KEY_10;
                CNS_KEY_11 = KEY_11;
                CNS_KEY_12 = KEY_12;
                CNS_KEY_13 = KEY_13;
                CNS_KEY_14 = (undefined)KEY_14;
                CNS_KEY_LENGTH = 57;
                __isoc99_fscanf(qcSerialFP, &PERC_S_FMT, qcSerial);
                memcpy(&qcSerial9Bytes, qcSerial, 9);
                CNS_KEY_LENGTH = CNS_KEY_LENGTH + 9;
                fclose(qcSerialFP);
                if (verbose)
                {
                    fprintf(stderr, "[ZC] Serial Number: %s\n", qcSerial);
                }
            }
        }
    }
    return true;
}

bool StartEngine(int isCNS)
{
    EVP_CIPHER *pCipher;
    EVP_MD *pDigest;
    uchar auStack_60[32];
    uchar auStack_40[32];
    int derivedKeySize;
    int iterations;
    undefined4 *password;
    undefined ok;

    ok = 0;
    password = (undefined4 *)0x0;
    if (isCNS == 0)
    {
        password = &JSON_KEY_0;
    }
    else if (isCNS == 1)
    {
        password = &CNS_KEY_0;
    }
    else
    {
        fwrite("[ZC] Wrong Engine Type\n", 1, 0x17, stderr);
    }
    if (password != (undefined4 *)0x0)
    {
        iterations = 10;
        pCipher = EVP_aes_128_ctr();
        pDigest = EVP_sha1();
        derivedKeySize =
            EVP_BytesToKey(pCipher, pDigest, (uchar *)0x0, (uchar *)password, password[32], iterations,
                           auStack_60, auStack_40);
        if (derivedKeySize == 16)
        {
            if (MUST_CLEANUP_CTXs != 0)
            {
                EVP_CIPHER_CTX_cleanup(&CTX_FOR_ENCRYPT);
                EVP_CIPHER_CTX_cleanup(&CTX_FOR_DECRYPT);
            }
            EVP_CIPHER_CTX_init(&CTX_FOR_ENCRYPT);
            pCipher = EVP_aes_128_ctr();
            EVP_EncryptInit_ex(&CTX_FOR_ENCRYPT, pCipher, (ENGINE *)0x0, auStack_60, auStack_40);
            EVP_CIPHER_CTX_init(&CTX_FOR_DECRYPT);
            pCipher = EVP_aes_128_ctr();
            EVP_DecryptInit_ex(&CTX_FOR_DECRYPT, pCipher, (ENGINE *)0x0, auStack_60, auStack_40);
            MUST_CLEANUP_CTXs = 1;
            ok = 1;
        }
        else
        {
            fwrite("[ZC] Wrong Key Size\n", 1, 0x14, stderr);
        }
    }
    return (bool)ok;
}

bool Encrypt(crypt_buffer_t *buffer)
{
    bool ok;

    if (buffer->currOffset == 0)
    {
        ok = encryptBegin(buffer);
    }
    else
    {
        ok = encryptContinue(buffer);
    }
    return ok;
}

bool encryptBegin(crypt_buffer_t *buffer)
{
    void *newData;
    int outSize;
    size_t newDataSize;
    bool ok;

    ok = 0;
    newDataSize = buffer->inputSize + 0x10;
    newData = malloc(newDataSize);
    buffer->outputBuffer = newData;
    if (buffer->outputBuffer == (void *)0x0)
    {
        fwrite("[ZC] No memory available\n", 1, 0x19, stderr);
    }
    else
    {
        EVP_EncryptInit_ex(&CTX_FOR_ENCRYPT, (EVP_CIPHER *)0x0, (ENGINE *)0x0, (uchar *)0x0, (uchar *)0x0);
        EVP_EncryptUpdate(&CTX_FOR_ENCRYPT, (uchar *)buffer->outputBuffer, (int *)&newDataSize,
                          (uchar *)buffer->inputBuffer, buffer->inputSize);
        EVP_EncryptFinal_ex(&CTX_FOR_ENCRYPT, (uchar *)((int)buffer->outputBuffer + newDataSize), &outSize);
        buffer->totalDone = newDataSize + outSize;
        ok = 1;
    }
    return ok;
}

bool encryptContinue(crypt_buffer_t *buffer)
{
    void *newData;
    int newSize;
    int newDataSize;
    undefined ok;

    ok = 0;
    newDataSize = (buffer->inputSize - buffer->currOffset) + 0x10;
    newData = malloc(buffer->currOffset + newDataSize);
    buffer->outputBuffer = newData;
    if (buffer->outputBuffer == (void *)0x0)
    {
        fwrite("[ZC] No memory available\n", 1, 0x19, stderr);
    }
    else
    {
        memcpy(buffer->outputBuffer, buffer->inputBuffer, buffer->currOffset);
        EVP_EncryptInit_ex(&CTX_FOR_ENCRYPT, (EVP_CIPHER *)0x0, (ENGINE *)0x0, (uchar *)0x0, (uchar *)0x0);
        EVP_EncryptUpdate(&CTX_FOR_ENCRYPT, (uchar *)((int)buffer->outputBuffer + buffer->currOffset),
                          &newDataSize, (uchar *)((int)buffer->inputBuffer + buffer->currOffset),
                          buffer->inputSize - buffer->currOffset);
        EVP_EncryptFinal_ex(&CTX_FOR_ENCRYPT,
                            (uchar *)((int)buffer->outputBuffer + buffer->currOffset + newDataSize),
                            &newSize);
        buffer->totalDone = buffer->currOffset + newDataSize + newSize;
        ok = 1;
    }
    return (bool)ok;
}

bool Decrypt(crypt_buffer_t *buffer)
{
    bool ok;

    if (buffer->currOffset == 0)
    {
        ok = decryptBegin(buffer);
    }
    else
    {
        ok = decryptContinue(buffer);
    }
    return ok;
}

bool decryptBegin(crypt_buffer_t *buffer)

{
    void *newData;
    int newSize;
    size_t dataSize;
    bool ok;

    ok = false;
    dataSize = buffer->inputSize;
    newSize = 0;
    newData = malloc(dataSize);
    buffer->outputBuffer = newData;
    if (buffer->outputBuffer == (void *)0x0)
    {
        fwrite("[ZC] No memory available\n", 1, 0x19, stderr);
    }
    else
    {
        EVP_DecryptInit_ex(&CTX_FOR_DECRYPT, (EVP_CIPHER *)0x0, (ENGINE *)0x0, (uchar *)0x0, (uchar *)0x0);
        EVP_DecryptUpdate(&CTX_FOR_DECRYPT, (uchar *)buffer->outputBuffer, (int *)&dataSize,
                          (uchar *)buffer->inputBuffer, buffer->inputSize);
        EVP_DecryptFinal_ex(&CTX_FOR_DECRYPT, (uchar *)((int)buffer->outputBuffer + dataSize), &newSize);
        buffer->totalDone = dataSize + newSize;
        ok = true;
    }
    return ok;
}

bool decryptContinue(crypt_buffer_t *buffer)
{
    void *newData;
    int outSize;
    int newSize;
    bool ok;

    ok = false;
    newSize = buffer->inputSize - buffer->currOffset;
    outSize = 0;
    newData = malloc(buffer->currOffset + newSize);
    buffer->outputBuffer = newData;
    if (buffer->outputBuffer == (void *)0x0)
    {
        fwrite("[ZC] No memory available\n", 1, 0x19, stderr);
    }
    else
    {
        memcpy(buffer->outputBuffer, buffer->inputBuffer, buffer->currOffset);
        EVP_DecryptInit_ex(&CTX_FOR_DECRYPT, (EVP_CIPHER *)0x0, (ENGINE *)0x0, (uchar *)0x0, (uchar *)0x0);
        EVP_DecryptUpdate(&CTX_FOR_DECRYPT, (uchar *)((int)buffer->outputBuffer + buffer->currOffset),
                          &newSize, (uchar *)((int)buffer->inputBuffer + buffer->currOffset),
                          buffer->inputSize - buffer->currOffset);
        EVP_DecryptFinal_ex(&CTX_FOR_DECRYPT,
                            (uchar *)((int)buffer->outputBuffer + buffer->currOffset + newSize), &outSize);
        buffer->totalDone = buffer->currOffset + newSize + outSize;
        ok = true;
    }
    return ok;
}
